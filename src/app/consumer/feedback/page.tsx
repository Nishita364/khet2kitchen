
"use client";

import { FeedbackForm } from "@/components/dashboard/feedback-form";

export default function ConsumerFeedbackPage() {
  return (
    <>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl font-headline">
          Submit Feedback
        </h1>
      </div>
      <FeedbackForm userType="consumer" />
    </>
  );
}
