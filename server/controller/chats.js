import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Chat from '../models/chatsSchema.js';
import Message from '../models/MessagesSchema.js'

// create a new conversation
// export const createChat = asyncHandler(async (req, res, next) =>
// {
//   const { body, uid } = req;
//   console.log("participants:", body);
//   res.json(participants)
//   // const newChat = new Chat.create({ participants });
//   // const savedChat = await newChat.save();
//   // res.status(201).json(savedChat);
// })

// export const createChat = asyncHandler(async (req, res, next) =>
// {
//   const { participants } = req.body;
//   // Validate that participants is an array and has at least two members
//   if (!Array.isArray(participants) || participants.length < 2) throw new ErrorResponse('Participants must be an array with at least two user IDs', 400);

//   const newConversation = await Chat.create({ participants });
//   if (!newConversation) throw new ErrorResponse('An error occurred while creating the conversation', 500)
//   res.status(201).json(newConversation);
// });

export const createChat = asyncHandler(async (req, res, next) =>
{
  const { participants } = req.body;

  // Validate that participants is an array and has at least two members
  if (!Array.isArray(participants) || participants.length < 2)
  {
    return next(new ErrorResponse('Participants must be an array with at least two user IDs', 400));
  }

  try
  {
    const newConversation = await Chat.create({ participants });
    res.status(201).json(newConversation);
  } catch (error)
  {
    console.error('Error creating conversation:', error);
    return next(new ErrorResponse('An error occurred while creating the conversation', 500));
  }
});


// get a chat 
export const getChat = asyncHandler(async (req, res, next) =>
{
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId).populate('participants').populate('messages');
  if (!chat) throw new ErrorResponse('Chat not found', 404)
  res.json(chat);
})

// Delete a conversation
export const deleteChat = asyncHandler(async (req, res, next) =>
{
  const { chatId } = req.params;
  await Chat.findByIdAndDelete(chatId);
  await Message.deleteMany({ chat: chatId });
  res.json({ success: 'Conversation deleted' });
});


