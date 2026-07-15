import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { createJob } from "@/services/jobService";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Textarea from "@/components/ui/textarea/Textarea";
import Badge from "@/components/ui/badge/Badge";

/**
 * JobPostWizardPage — palette/type locked to match PreferencesWizardPage
 * and the rest of the site (sky-* → brand-*, slate-900/300/200 →
 * ink/slate-100). Same structure as the employee wizard, so kept the
 * same conventions: font-display on the page h2, font-sans/semibold on
 * step titles (h3), `!important`-guarded Button colors (confirmed bug,
 * see PreferencesWizardPage notes).
 */
const STEPS = [
  "Job Basics",
  "Compensation & Location",
  "Culture & Requirements",
  "Desired Candidate",
  "Description",
];

export default function JobPostWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: "",
      location: "",
      workType: "",
      salaryMin: "",
      salaryMax: "",
      institutionType: "",
      languages: [],
      culture: "",
      healthPriorities: [],
      description: "",
    },
  });

  const formData = watch();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleArrayItem = (field, item) => {
    const current = formData[field] || [];
    if (current.includes(item)) {
      setValue(
        field,
        current.filter((i) => i !== item),
      );
    } else {
      setValue(field, [...current, item]);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const formattedData = {
        ...data,
        salaryMin: data.salaryMin ? Number(data.salaryMin) : 0,
        salaryMax: data.salaryMax ? Number(data.salaryMax) : 0,
      };

      await createJob(formattedData);
      toast.success("Job posted successfully!");
      navigate("/dashboard/employer");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to post job.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Job Basics
        return (
          <div className="space-y-4">
            <h3 className="font-sans text-lg font-semibold text-ink">
              What role are you hiring for?
            </h3>
            <Input
              label="Job Title"
              placeholder="e.g. Senior Registered Nurse"
              {...register("title")}
            />
            <div>
              <label className="mb-2 block font-sans text-sm font-medium text-slate-700">
                Work Type
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                {["Full-time", "Part-time", "Contract", "Temporary"].map(
                  (type) => (
                    <div
                      key={type}
                      onClick={() => setValue("workType", type)}
                      className={`cursor-pointer rounded-xl border p-4 font-sans transition-all ${
                        formData.workType === type
                          ? "border-brand-600 bg-brand-50 shadow-sm"
                          : "border-slate-100 hover:border-brand-100 hover:bg-slate-50"
                      }`}
                    >
                      <div className="font-medium text-ink">{type}</div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        );
      case 1: // Compensation & Location
        return (
          <div className="space-y-4">
            <h3 className="font-sans text-lg font-semibold text-ink">
              Where and for how much?
            </h3>
            <Input
              label="Location (City)"
              placeholder="e.g. Addis Ababa"
              {...register("location")}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                type="number"
                label="Minimum Salary"
                placeholder="e.g. 10000"
                {...register("salaryMin")}
              />
              <Input
                type="number"
                label="Maximum Salary"
                placeholder="e.g. 20000"
                {...register("salaryMax")}
              />
            </div>
          </div>
        );
      case 2: // Culture & Requirements
        return (
          <div className="space-y-4">
            <h3 className="font-sans text-lg font-semibold text-ink">
              Environment and requirements
            </h3>
            <div>
              <label className="mb-2 block font-sans text-sm font-medium text-slate-700">
                Institution Type
              </label>
              <select
                className="w-full rounded-lg border border-slate-100 px-3 py-2 font-sans text-ink focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                {...register("institutionType")}
              >
                <option value="">Select an institution type</option>
                <option value="Hospital">Hospital</option>
                <option value="Clinic">Clinic</option>
                <option value="Health Center">Health Center</option>
                <option value="NGO">NGO</option>
                <option value="University">University</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block font-sans text-sm font-medium text-slate-700">
                Work Culture
              </label>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Collaborative",
                  "Fast-paced",
                  "Supportive",
                  "Innovative",
                  "Flexible",
                ].map((cult) => (
                  <Badge
                    key={cult}
                    onClick={() => setValue("culture", cult)}
                    variant={formData.culture === cult ? "primary" : "default"}
                    className="cursor-pointer justify-center py-2 font-sans"
                  >
                    {cult}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 3: // Desired Candidate
        return (
          <div className="space-y-6">
            <h3 className="font-sans text-lg font-semibold text-ink">
              Specialties and languages
            </h3>
            <div>
              <label className="mb-2 block font-sans text-sm font-medium text-slate-700">
                Health Priorities
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Primary Care",
                  "Pediatrics",
                  "Maternal Health",
                  "Surgery",
                  "Infectious Diseases",
                  "Specialty Care",
                ].map((priority) => (
                  <Badge
                    key={priority}
                    onClick={() =>
                      toggleArrayItem("healthPriorities", priority)
                    }
                    variant={
                      formData.healthPriorities?.includes(priority)
                        ? "success"
                        : "default"
                    }
                    className="cursor-pointer font-sans"
                  >
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block font-sans text-sm font-medium text-slate-700">
                Required Languages
              </label>
              <div className="flex flex-wrap gap-2">
                {["Amharic", "English", "Oromo", "Tigrinya", "Somali"].map(
                  (lang) => (
                    <Badge
                      key={lang}
                      onClick={() => toggleArrayItem("languages", lang)}
                      variant={
                        formData.languages?.includes(lang)
                          ? "success"
                          : "default"
                      }
                      className="cursor-pointer font-sans"
                    >
                      {lang}
                    </Badge>
                  ),
                )}
              </div>
            </div>
          </div>
        );
      case 4: // Description
        return (
          <div className="space-y-4">
            <h3 className="font-sans text-lg font-semibold text-ink">
              Job description
            </h3>
            <Textarea
              label="Detailed Description"
              placeholder="Provide more details about the role, responsibilities, and qualifications to help candidates understand what you are looking for."
              rows={6}
              {...register("description")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
      {/* Progress */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-medium text-ink">
          Post a new job
        </h2>
        <p className="font-sans text-slate-500">
          Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}
        </p>
        <div className="mt-4 flex gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i <= currentStep ? "bg-brand-600" : "bg-slate-100"
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="min-h-[250px]"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            className="font-sans !text-slate-500 hover:!text-ink"
          >
            Back
          </Button>

          {currentStep === STEPS.length - 1 ? (
            <Button
              type="submit"
              variant="success"
              loading={isSubmitting}
              className="font-sans font-medium !text-white"
            >
              Post job
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleNext}
              className="!bg-brand-600 font-sans font-medium !text-white hover:!bg-brand-700"
            >
              Next Step
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
