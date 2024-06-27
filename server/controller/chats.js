import asyncHandler from '../utils/asyncHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import Chat from '../models/chatsSchema.js';
import Message from '../models/MessagesSchema.js'

// create a new conversation

export const createChat = asyncHandler(async (req, res, next) =>
{
  const { participants } = req.body;

  // Validate that participants is an array and has at least two members
  if (!Array.isArray(participants) || participants.length < 2) throw new ErrorResponse('Participants must be an array with at least two user IDs', 400);

  const newConversation = await Chat.create({ participants });
  if (!newConversation) throw new ErrorResponse('An error occurred while creating the conversation', 500)
  res.status(201).json(newConversation);
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



// Delete a conversation
// Delete a conversation
export const deleteChat = asyncHandler(async (req, res, next) =>
{
  const {
    params: { id },
    uid,
  } = req;

  const found = await Chat.findById(id);
  if (!found) throw new ErrorResponse(`Chat ${id} does not exist`, 404);

  const isParticipant = found.participants.some(participant => participant.toString() === uid.toString());
  if (!isParticipant) throw new ErrorResponse('You have no permission to delete this chat', 401);

  await Chat.findByIdAndDelete(id);
  res.json({ success: `Chat ${id} was deleted` });
});



