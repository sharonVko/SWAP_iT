import Message from '../models/messagesSchema.js';
import Chat from '../models/chatsSchema.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/usersSchema.js'

// send a message - if senderand receiver is registered - if sender is loggedin - if chat is not exist then it should create also chat id. - message should save in msgschema and chatschema also - right now user is able to chat with himself also. but we can implement that later. - if chat is already exist then it should save those messages to that chat.

export const sendMessage = asyncHandler(async (req, res, next) =>
{
  const { chatId, message, receiverId } = req.body; // Include receiverId to create new chat if needed
  const { uid } = req;

  console.log('Request body:', req.body); // Log request body
  console.log('User ID:', uid); // Log user ID from token

  // Check if sender (user) is registered
  const sender = await User.findById(uid);
  if (!sender) throw new ErrorResponse('Sender not found', 404);

  // Check if receiver is registered
  const receiver = await User.findById(receiverId);
  if (!receiver) throw new ErrorResponse('Receiver not found', 404);

  let chat;

  // If chatId is provided, check if chat exists with that chatId
  if (chatId)
  {
    chat = await Chat.findById(chatId);
  } else
  {
    // Check if a chat already exists between the two users
    chat = await Chat.findOne({
      participants: { $all: [uid, receiverId] }
    });
  }

  // If chat does not exist, create a new chat with both participants
  if (!chat)
  {
    chat = await Chat.create({ participants: [uid, receiverId] });
  }

  // Create a new message and link it to the chat
  const newMessage = await Message.create({ chat: chat._id, sender_id: uid, message });

  // Add the new message to the chat's messages array
  chat.messages.push(newMessage._id);
  await chat.save();

  // Populate the sender_id
  const populatedMessage = await Message.findById(newMessage._id).populate('sender_id');

  res.status(201).json(populatedMessage);
});


//get all messages
export const getMessages = asyncHandler(async (req, res, next) =>
{
  const { chatId } = req.params;
  const { uid } = req;
  console.log('Fetching messages for chatId:', chatId);
  console.log('User ID:', uid);
  // Check if the user is a participant of the chat
  const chat = await Chat.findById(chatId);
  if (!chat) throw new ErrorResponse('Chat not found', 404);

  const isParticipant = chat.participants.some(participant => participant.equals(uid));
  if (!isParticipant) throw new ErrorResponse('Unauthorized - You are not a participant of this chat', 403);

  // Retrieve messages
  const messages = await Message.find({ chat: chatId }).sort({ createdAt: 1 });

  if (!messages.length) throw new ErrorResponse('Messages not found', 404);
  res.json(messages);
});

//update message
export const updateMessage = asyncHandler(async (req, res, next) =>
{
  const { chatId } = req.body;
  const { body, uid, params: { id }, } = req;
  console.log('Request body:', body); // Log request body
  console.log('User ID:', uid); // Log user ID from token
  console.log('chat id: ', chatId);

  const found = await Message.findById(id);
  if (!found) throw new ErrorResponse(`message ${id} does not exist`, 404);

  if (uid !== found.sender_id.toString())
    throw new ErrorResponse('You have no permission to update this message', 401);

  const updatedMessage = await Message.findByIdAndUpdate(id, body, {
    new: true,
  }).populate('sender_id');

  await Chat.findByIdAndUpdate(chatId, body, {
    new: true,
  }).populate('messages');

  res.json(updatedMessage);
});



// delete message

export const deleteMessage = asyncHandler(async (req, res, next) =>
{
  const { body, params: { id }, uid, } = req;
  const found = await Message.findById(id);
  if (!found) throw new ErrorResponse(`message with ${id} not exist`, 404);
  if (uid !== found.sender_id.toString())
    throw new ErrorResponse('You have no permission to delete this message', 401);
  await Message.findByIdAndDelete(id, body, { new: true });
  res.json({ success: `Message ${id} was deleted` });
})

