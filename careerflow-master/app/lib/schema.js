import { z } from "zod";

export const onboardingSchema = z.object({
  industry: z
    .string({ required_error: 'Please select an industry' })
    .nonempty({ message: 'Please select an industry' }),
  subIndustry: z
    .string({ required_error: 'Please select a specialization' })
    .nonempty({ message: 'Please select a specialization' }),
  bio: z.string().max(500).optional(),
  experience: z
    .string({ required_error: 'Please enter years of experience' })
    .nonempty({ message: 'Please enter years of experience' })
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience must be at least 0 years")
        .max(50, "Experience cannot exceed 50 years")
    ),
  skills: z
    .string({ required_error: 'Please provide your skills' })
    .nonempty({ message: 'Please provide your skills' })
    .transform((val) =>
      val.split(',').map((skill) => skill.trim()).filter(Boolean)
    ),
});


export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
});

export const entrySchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    organization: z.string().min(1, "Organization is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().min(1, "Description is required"),
    current: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.current && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required unless this is your current position",
      path: ["endDate"],
    }
  );

  import { z } from "zod";
  export const resumeSchema = z.object({
    contactInfo: z.object({
      email: z.string().email().optional(),
      mobile: z.string().optional(),
      linkedin: z.string().url().optional(),
      twitter: z.string().url().optional(),
    }),
    summary: z.string().min(1, "Summary is required"),
    skills: z.string().min(1, "Skills are required"),
    experience: z.array(entrySchema).min(1, "At least one experience entry is required"),
    education: z.array(entrySchema).min(1, "At least one education entry is required"),
    projects: z.array(entrySchema).optional(),
    jobDescription: z.string().optional(), // New field
  });

export const coverLetterSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().min(1, "Job description is required"),
});

