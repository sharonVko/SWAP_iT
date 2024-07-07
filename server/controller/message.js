import Message from '../models/messagesSchema.js';
import Chat from '../models/chatsSchema.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/usersSchema.js';

// send a message
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { chatId, message, receiverId, ad_id } = req.body;
  const { uid } = req;

  const sender = await User.findById(uid).select('username');
  if (!sender) {
    throw new ErrorResponse('Sender not found', 404);
  }

  let chat;

  if (chatId) {
    chat = await Chat.findById(chatId);
    if (!chat) {
      throw new ErrorResponse('Chat not found', 404);
    }
  } else {
    chat = await Chat.create({ participants: [uid, receiverId], ad_id });
  }

  const newMessage = await Message.create({
    chat: chat._id,
    sender_id: sender._id, // Store sender_id as an ObjectId
    message,
    ad_id,
  });

  chat.messages.push(newMessage._id);
  await chat.save();

  const populatedMessage = await Message.findById(newMessage._id).populate(
    'sender_id',
    'username'
  );

  res.status(201).json(populatedMessage);
  req.io.to(chat._id).emit('newMessage', populatedMessage); // Emit the message to the conversation room
});

// get all messages
export const getMessages = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  const { uid } = req;

  // Check if the user is a participant of the chat
  const chat = await Chat.findById(chatId);
  if (!chat) throw new ErrorResponse('Chat not found', 404);

  const isParticipant = chat.participants.some((participant) =>
    participant.equals(uid)
  );
  if (!isParticipant)
    throw new ErrorResponse(
      'Unauthorized - You are not a participant of this chat',
      403
    );

  // Retrieve messages and populate sender_id with username
  const messages = await Message.find({ chat: chatId })
    .sort({ createdAt: 1 })
    .populate('sender_id', 'username');

  res.json(messages);
});

// delete message
export const deleteMessage = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    uid,
  } = req;

  // Find the message by ID
  const found = await Message.findById(id);
  if (!found)
    throw new ErrorResponse(`Message with ID ${id} does not exist`, 404);

  // Check if the logged-in user is the sender of the message
  if (uid !== found.sender_id.toString())
    throw new ErrorResponse(
      'You do not have permission to delete this message',
      401
    );

  // Delete the message
  await Message.findByIdAndDelete(id);

  res.json({ success: `Message with ID ${id} was deleted` });
});

export const deleteMessages = asyncHandler(async (req, res, next) => {
  const { ids } = req.body; // Array of message IDs
  const { uid } = req;

  if (!Array.isArray(ids) || ids.length === 0)
    throw new ErrorResponse('No message IDs provided', 400);

  // Find all messages by IDs
  const messages = await Message.find({ _id: { $in: ids } });

  // Check if all messages exist
  if (messages.length !== ids.length)
    throw new ErrorResponse('Some messages not found', 404);

  // Check if the logged-in user is the sender of each message
  const unauthorizedMessages = messages.filter(
    (msg) => msg.sender_id.toString() !== uid
  );
  if (unauthorizedMessages.length > 0)
    throw new ErrorResponse(
      'You do not have permission to delete some of these messages',
      401
    );

  // Extract chat IDs
  const chatIds = [...new Set(messages.map((msg) => msg.chat.toString()))];

  // Delete all authorized messages
  await Message.deleteMany({ _id: { $in: ids } });

  // Remove messages from corresponding chats
  await Chat.updateMany(
    { _id: { $in: chatIds } },
    { $pull: { messages: { $in: ids } } }
  );

  res.json({ success: `Messages with IDs ${ids.join(', ')} were deleted` });
});
