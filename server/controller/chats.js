import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Chat from '../models/chatsSchema.js';
import User from '../models/usersSchema.js';
import Message from '../models/messagesSchema.js';
import Ads from '../models/adsSchema.js';

export const createChat = asyncHandler(async (req, res, next) => {
  const { participants, messages, ad_id } = req.body;
  const { uid } = req;

  console.log('Request Body:', req.body);

  // Validate that participants is an array and has exactly two members
  if (!Array.isArray(participants) || participants.length !== 2) {
    throw new ErrorResponse(
      'Participants must be an array with exactly two user IDs',
      400
    );
  }

  // Ensure the logged-in user is the first participant (sender)
  if (!participants.includes(uid.toString())) {
    throw new ErrorResponse(
      'Sender must be logged in, you cannot have a conversation. Please login first!',
      400
    );
  }

  // Check if all participants are registered users
  const users = await User.find({ _id: { $in: participants } });
  console.log('Participants:', participants);
  console.log('Found Users:', users);

  if (users.length !== participants.length) {
    throw new ErrorResponse('All participants must be registered users', 400);
  }

  // Check if the provided ad_id exists and belongs to one of the participants
  const adExists = await Ads.exists({
    _id: ad_id,
    user_id: { $in: participants },
  });

  if (!adExists) {
    throw new ErrorResponse(
      'Ad does not exist or does not belong to any of the participants',
      400
    );
  }

  // Check if a chat already exists between these participants for the specified ad
  let chat = await Chat.findOne({
    participants: { $all: participants },
    ad_id,
  });

  // If chat exists, update it with the new messages
  if (chat) {
    const newMessages = messages.map((msg) => ({
      chat: chat._id,
      sender_id: uid,
      message: msg,
      ad_id: ad_id, // Include ad_id in each message
    }));

    const createdMessages = await Message.insertMany(newMessages);
    chat.messages.push(...createdMessages.map((msg) => msg._id));
    chat.updatedAt = Date.now();
    await chat.save();
    res.status(200).json(chat);
  } else {
    // If chat does not exist, create a new chat and save the messages
    const newChat = await Chat.create({ participants, ad_id });
    const newMessages = messages.map((msg) => ({
      chat: newChat._id,
      sender_id: uid,
      message: msg,
      ad_id: ad_id, // Include ad_id in each message
    }));
    const createdMessages = await Message.insertMany(newMessages);
    newChat.messages.push(...createdMessages.map((msg) => msg._id));
    await newChat.save();
    res.status(201).json(newChat);
  }
});

// get a chat
export const getChatbyId = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    uid,
  } = req;

  const chat = await Chat.findById(id)
    .populate('participants', 'username') // Populate username field for participants
    .populate('messages');

  if (!chat) throw new ErrorResponse('Chat not found', 404);

  const isParticipant = chat.participants.some(
    (participant) => participant._id.toString() === uid.toString()
  );

  if (!isParticipant) {
    throw new ErrorResponse(
      'You do not have permission to view this chat',
      403
    );
  }
  res.status(200).json(chat);
});

// Get all chats for a user
export const getAllChatsForUser = asyncHandler(async (req, res, next) => {
  const { uid } = req;
  const chats = await Chat.find({
    participants: uid,
    //deletedFor: { $ne: uid },
  })
    .populate('participants', 'username') // Populate username field for participants
    .populate('messages');

  console.log(chats);

  res.status(200).json(chats);
});

// Delete a conversation
// - if user is participant
// - if he is loggedin
// - chat should only deleted from his account , other participant can have that chat.
// - user should be able to delete multiple chats at the same time.
// we don't really need delete single chat because we can do that using delete multiple chats also.
// before deleting chat we can ask for confirmation - nice to have or later

export const deleteChat = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    uid,
  } = req;
  console.log('chatId: ', id);
  console.log('userId: ', uid);
  try {
    await Chat.findByIdAndDelete(id);
    res.json({ message: 'Chat was deleted' });
    console.log('chat was deleted');
  } catch (error) {
    next(error);
  }

  /*

  const found = await Chat.findById(id);
  if (!found) throw new ErrorResponse(`Chat ${id} does not exist`, 404);

	const isParticipant = found.participants.some(
    (participant) => participant.toString() === uid.toString()
  );

  if (!isParticipant) {
		throw new ErrorResponse('You have no permission to delete this chat', 401);
	}

  if (!found.deletedFor.includes(uid)) {
    found.deletedFor.push(uid);
  }
  await found.save();
  res.json({ success: `Chat ${id} was deleted for user ${uid}` });

	*/
});

// to delete multiple chats
export const deleteChats = asyncHandler(async (req, res, next) => {
  const { ids } = req.body;
  const uid = req.uid; // Retrieve uid from the request object

  if (!Array.isArray(ids) || ids.length === 0)
    throw new ErrorResponse('No chat IDs provided', 400);
  const chats = await Chat.find({ _id: { $in: ids } });
  const invalidChats = chats.filter(
    (chat) =>
      !chat.participants.some(
        (participant) => participant.toString() === uid.toString()
      )
  );
  if (invalidChats.length > 0)
    throw new ErrorResponse(
      'You have no permission to delete some of these chats',
      401
    );

  await Chat.updateMany(
    { _id: { $in: ids } },
    { $addToSet: { deletedFor: uid } }
  );

  res.json({ success: `Chats ${ids.join(', ')} were deleted for user ${uid}` });
});
