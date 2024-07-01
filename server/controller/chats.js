import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Chat from '../models/chatsSchema.js';
import User from '../models/usersSchema.js';
import Message from '../models/messagesSchema.js';

// create a new conversation
//- x there should be exact 2 participants -  x if both user is registered - x  one of the participants who is loggedin , he has to be sender , - it should save to chat and if there is message then it should save to message controller also , - message should not be empty string

export const createChat = asyncHandler(async (req, res, next) =>
{
  const { participants, messages, ad_id, uid } = req.body;

  // Validate that participants is an array and has exactly two members
  if (!Array.isArray(participants) || participants.length !== 2) throw new ErrorResponse('Participants must be an array with exactly two user IDs', 400);

  // Ensure the logged-in user is the first participant (sender)
  if (!participants.includes(req.uid.toString())) throw new ErrorResponse('Sender must be logged in, you cannot have a conversation. Please login first!', 400);

  // Check if all participants are registered users
  const users = await User.find({ _id: { $in: participants } });
  if (users.length !== participants.length) throw new ErrorResponse('All participants must be registered users', 400);

  // Check if a chat already exists between these participants for the specified ad
  let chat = await Chat.findOne({ participants: { $all: participants }, ad_id });

  // If chat exists, update it with the new messages
  if (chat)
  {
    const newMessages = messages.map(msg => ({
      chat: chat._id,
      sender_id: req.uid,
      message: msg
    }));
    const createdMessages = await Message.insertMany(newMessages);
    chat.messages.push(...createdMessages.map(msg => msg._id));
    chat.updatedAt = Date.now();
    await chat.save();

    res.status(200).json(chat);
  } else
  {
    // If chat does not exist, create a new chat and save the messages
    const newChat = await Chat.create({ participants, ad_id });
    const newMessages = messages.map(msg => ({
      chat: newChat._id,
      sender_id: req.user._id,
      message: msg
    }));
    const createdMessages = await Message.insertMany(newMessages);
    newChat.messages.push(...createdMessages.map(msg => msg._id));
    await newChat.save();

    res.status(201).json(newChat);
  }
});


// get a chat
export const getChatbyId = asyncHandler(async (req, res, next) =>
{
  const {
    body,
    params: { id },
    uid,
  } = req;
  console.log('Request body:', body);
  console.log('User ID:', uid);
  console.log('Chat ID:', id);

  const chat = await Chat.findById(id).populate('participants').populate('messages');
  if (!chat) throw new ErrorResponse('Chat not found', 404);

  // Check if the user is a participant in the chat
  const isParticipant = chat.participants.some(participant => participant._id.toString() === uid.toString());

  // If the user is not a participant, throw an error
  if (!isParticipant) throw new ErrorResponse('You do not have permission to view this chat', 403);

  // If the user is a participant, return the chat

  res.status(200).json(chat);
})


// Delete a conversation - if user is aprticipants - if he is loggedin - chat should only deleted from his account , other participant can have that chat. - user should be able to delete multiple chats at the same time.
// we don't really need delete single chat because we can do that using delete multiple chats also.
// before deleting chat we can ask for confirmation - nice to have or later
export const deleteChat = asyncHandler(async (req, res, next) =>
{
  const {
    params: { id },
    uid,
  } = req;

  if (!found) throw new ErrorResponse(`Chat ${id} does not exist`, 404);
  const found = await Chat.findById(id);

  const isParticipant = found.participants.some(participant => participant.toString() === uid.toString());
  if (!isParticipant) throw new ErrorResponse('You have no permission to delete this chat', 401);

  if (!found.deletedFor.includes(uid))
  {
    found.deletedFor.push(uid);
  }

  await found.save();
  res.json({ success: `Chat ${id} was deleted for user ${uid}` });
});


// to delete multiple chats
export const deleteChats = asyncHandler(async (req, res, next) =>
{
  const { ids } = req.body;
  const uid = req.uid; // Retrieve uid from the request object

  if (!Array.isArray(ids) || ids.length === 0) throw new ErrorResponse('No chat IDs provided', 400);

  const chats = await Chat.find({ _id: { $in: ids } });

  const invalidChats = chats.filter(chat =>
    !chat.participants.some(participant => participant.toString() === uid.toString())
  );

  if (invalidChats.length > 0) throw new ErrorResponse('You have no permission to delete some of these chats', 401);

  await Chat.updateMany(
    { _id: { $in: ids } },
    { $addToSet: { deletedFor: uid } }
  );

  res.json({ success: `Chats ${ids.join(', ')} were deleted for user ${uid}` });
});