
"use server";

import { z } from "zod";
import { suggestCropPrice, type SuggestCropPriceOutput } from "@/ai/flows/suggest-crop-price";
import { gradeProduce, type GradeProduceOutput } from "@/ai/flows/grade-produce-flow";
import { diagnosePest, type DiagnosePestOutput } from "@/ai/flows/diagnose-pest-flow";
import { submitFeedback, type SubmitFeedbackOutput } from "@/ai/flows/submit-feedback-flow";


const suggestPriceSchema = z.object({
  cropType: z.string().min(1, 'Crop type is required.'),
  plantingDate: z.date({ required_error: 'Planting date is required.' }),
  expectedYield: z.coerce.number().min(1, 'Expected yield must be greater than 0.'),
  location: z.string().min(1, 'Location is required.'),
});

export async function handleSuggestPrice(
  prevState: any,
  formData: FormData
): Promise<{ message: string; data: SuggestCropPriceOutput | null; error: string | null; }> {
  try {
    const data = {
      cropType: formData.get('cropType'),
      plantingDate: new Date(formData.get('plantingDate') as string),
      expectedYield: formData.get('expectedYield'),
      location: formData.get('location'),
    };
    const validatedFields = suggestPriceSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        message: 'Validation failed.',
        data: null,
        error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
      };
    }

    const result = await suggestCropPrice({
      ...validatedFields.data,
      plantingDate: validatedFields.data.plantingDate.toISOString().split('T')[0],
    });

    return {
      message: 'Suggestion received.',
      data: result,
      error: null,
    };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      message: 'An error occurred while fetching price suggestion.',
      data: null,
      error: errorMessage,
    };
  }
}


const gradeProduceSchema = z.object({
  produceType: z.string().min(1, 'Produce type is required.'),
  size: z.string().min(1, 'Size is required.'),
  color: z.string().min(1, 'Color is required.'),
  defects: z.string().min(1, 'Defects description is required.'),
  photoDataUri: z.string().min(1, "A photo is required."),
});

export async function handleGradeProduce(
  prevState: any,
  formData: FormData
): Promise<{ message: string; data: GradeProduceOutput | null; error: string | null; }> {
  try {
    const data = {
      produceType: formData.get('produceType'),
      size: formData.get('size'),
      color: formData.get('color'),
      defects: formData.get('defects'),
      photoDataUri: formData.get('photoDataUri'),
    };
    const validatedFields = gradeProduceSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        message: 'Validation failed.',
        data: null,
        error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
      };
    }

    const result = await gradeProduce(validatedFields.data);

    return {
      message: 'Grading successful.',
      data: result,
      error: null,
    };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      message: 'An error occurred while grading produce.',
      data: null,
      error: errorMessage,
    };
  }
}

const diagnosePestSchema = z.object({
  description: z.string().min(1, 'Please describe the issue.'),
  photoDataUri: z.string().min(1, "A photo is required."),
});


export async function handleDiagnosePest(
  prevState: any,
  formData: FormData
): Promise<{ message: string; data: DiagnosePestOutput | null; error: string | null; }> {
  try {
    const data = {
      description: formData.get('description'),
      photoDataUri: formData.get('photoDataUri'),
    };

    const validatedFields = diagnosePestSchema.safeParse(data);

    if (!validatedFields.success) {
        return {
            message: 'Validation failed.',
            data: null,
            error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
        };
    }
    
    const result = await diagnosePest(validatedFields.data);

    return {
      message: 'Diagnosis successful.',
      data: result,
      error: null,
    };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return {
      message: 'An error occurred while diagnosing the issue.',
      data: null,
      error: errorMessage,
    };
  }
}

const submitFeedbackSchema = z.object({
    feedbackText: z.string().min(10, 'Feedback must be at least 10 characters long.'),
    userType: z.enum(['farmer', 'company', 'consumer']),
});

export async function handleSubmitFeedback(
    prevState: any,
    formData: FormData
): Promise<{ message: string; data: SubmitFeedbackOutput | null; error: string | null; }> {
    try {
        const data = {
            feedbackText: formData.get('feedbackText'),
            userType: formData.get('userType'),
        };

        const validatedFields = submitFeedbackSchema.safeParse(data);

        if (!validatedFields.success) {
            return {
                message: 'Validation failed.',
                data: null,
                error: JSON.stringify(validatedFields.error.flatten().fieldErrors),
            };
        }

        const result = await submitFeedback(validatedFields.data);

        return {
            message: 'Feedback submitted successfully.',
            data: result,
            error: null,
        };
    } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return {
            message: 'An error occurred while submitting feedback.',
            data: null,
            error: errorMessage,
        };
    }
}
