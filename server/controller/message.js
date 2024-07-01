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

// delete message

export const deleteMessage = asyncHandler(async (req, res, next) =>
{
  const { params: { id }, uid } = req;

  // Find the message by ID
  const found = await Message.findById(id);
  if (!found) throw new ErrorResponse(`Message with ID ${id} does not exist`, 404);

  // Check if the logged-in user is the sender of the message
  if (uid !== found.sender_id.toString()) throw new ErrorResponse('You do not have permission to delete this message', 401);

  // Delete the message
  await Message.findByIdAndDelete(id);

  res.json({ success: `Message with ID ${id} was deleted` });
});


export const deleteMessages = asyncHandler(async (req, res, next) =>
{
  const { ids } = req.body; // Array of message IDs
  const { uid } = req;

  // Log the input data
  console.log('Message IDs to delete:', ids);
  console.log('User ID:', uid);

  if (!Array.isArray(ids) || ids.length === 0) throw new ErrorResponse('No message IDs provided', 400);


  // Find all messages by IDs
  const messages = await Message.find({ _id: { $in: ids } });

  // Log the found messages
  console.log('Found messages:', messages);

  // Check if all messages exist
  if (messages.length !== ids.length) throw new ErrorResponse('Some messages not found', 404);


  // Check if the logged-in user is the sender of each message
  const unauthorizedMessages = messages.filter(msg => msg.sender_id.toString() !== uid);
  if (unauthorizedMessages.length > 0) throw new ErrorResponse('You do not have permission to delete some of these messages', 401);

  // Extract chat IDs
  const chatIds = [...new Set(messages.map(msg => msg.chat.toString()))];

  // Log the chat IDs to be updated
  console.log('Chat IDs to be updated:', chatIds);

  // Delete all authorized messages
  await Message.deleteMany({ _id: { $in: ids } });

  // Log the deletion success
  console.log('Messages deleted successfully');

  // Remove messages from corresponding chats
  await Chat.updateMany(
    { _id: { $in: chatIds } },
    { $pull: { messages: { $in: ids } } }
  );

  // Log the chat update success
  console.log('Chats updated successfully');

  res.json({ success: `Messages with IDs ${ids.join(', ')} were deleted` });
});

//update message optional and not working in right way but i can implement it later..
// export const updateMessage = asyncHandler(async (req, res, next) =>
// {
//   const { chatId } = req.body;
//   const { body, uid, params: { id }, } = req;
//   console.log('Request body:', body); // Log request body
//   console.log('User ID:', uid); // Log user ID from token
//   console.log('chat id: ', chatId);

//   const found = await Message.findById(id);
//   if (!found) throw new ErrorResponse(`message ${id} does not exist`, 404);

//   if (uid !== found.sender_id.toString())
//     throw new ErrorResponse('You have no permission to update this message', 401);

//   const updatedMessage = await Message.findByIdAndUpdate(id, body, {
//     new: true,
//   }).populate('sender_id');

//   await Chat.findByIdAndUpdate(chatId, body, {
//     new: true,
//   }).populate('messages');

//   res.json(updatedMessage);
// });


