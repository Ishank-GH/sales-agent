"use server";

import { vapiServer } from "@/lib/vapi/vapiServer";
import { aiAgentPrompt } from "../lib/data";

export const getAllAssistants = async () => {
  try {
    const getAllAgent = await vapiServer.assistants.list();
    return {
      success: true,
      status: 200,
      data: getAllAgent,
    };
  } catch (error) {
    console.error("Error fetching agents: ", error);
    return {
      success: false,
      status: 500,
      message: "Failed to fetch agents",
    };
  }
};

export const createAssistant = async (name: string) => {
  try {
    const createAssistant = await vapiServer.assistants.create({
      name,
      firstMessage: `Hi there, this is ${name} from customer support. How can I help you today?`,
      model: {
        model: "gpt-4o",
        provider: "openai",
        messages: [
          {
            role: "system",
            content: aiAgentPrompt,
          },
        ],
        temperature: 0.5,
      },
    });
    return {
      success: true,
      status: 200,
      data: createAssistant,
    };
  } catch (error) {
    console.error("Error creating assistant:", error);
    return {
      status: 500,
      success: false,
      message: "Failed to create assistant",
    };
  }
};

export const updateAssistant = async (
  assistantId: string,
  firstMessage: string,
  systemPrompt: string
) => {
  try {
    const updateAssistant = await vapiServer.assistants.update(assistantId, {
      firstMessage: firstMessage,
      model: {
        model: "gpt-4o",
        provider: "openai",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
        ],
      },
    });
    console.log('Assistant Updated', updateAssistant);
    return{
      status: 200,
      success: true,
      data: updateAssistant
    }
    
  } catch (error) {
     console.error('Error Updating assistant', error);
    return{
      status: 500,
      success: false,
      message: 'Failed to update assistant',
      error: error, 
    }
    
  }
};
