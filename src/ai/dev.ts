
'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-crop-price.ts';
import '@/ai/flows/grade-produce-flow.ts';
import '@/ai/flows/diagnose-pest-flow.ts';
import '@/ai/flows/submit-feedback-flow.ts';
