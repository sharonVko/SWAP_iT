import Message from '../models/MessagesSchema.js';
import Chat from '../models/chatsSchema.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

// send a message

export const sendMessage = asyncHandler(async (req, res, next) =>
{
  const { body, uid } = req;
  console.log('Request body:', body); // Log request body
  console.log('User ID:', uid); // Log user ID from token

  const newMessage = await Message.create({ ...body, sender: uid });

  const populatedMessage = await Message.findById(newMessage._id).populate('sender_id');

  res.status(201).json(populatedMessage);
})

// export const sendMessage = asyncHandler(async (req, res, next) =>
// {
//   const { chatId, content } = req.body;
//   const sender = req.user.id;
//   const newMessage = new Message({ chat: chatId, sender, content });
//   const savedMessage = await newMessage.save();
//   await Chat.findByIdAndUpdate(chatId, { $push: { messages: savedMessage._id } });
//   res.status(201).json(savedMessage);
// })

//get all messages
export const getMessages = asyncHandler(async (req, res, next) =>
{
  const { chatId } = req.params;
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

