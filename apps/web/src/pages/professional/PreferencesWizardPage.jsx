import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { updateEmployeeProfile } from "@/services/employeeService";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Textarea from "@/components/ui/textarea/Textarea";
import Badge from "@/components/ui/badge/Badge";

const STEPS = [
  "Work Basics",
  "Compensation & Location",
  "Culture & Institution",
  "Health Priorities & Languages",
  "Free Text",
];

export default function PreferencesWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      location: "",
      workType: "",
      salaryMin: "",
      salaryMax: "",
      institutionType: "",
      languages: [],
      culture: "",
      healthPriorities: [],
      freeText: "",
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
        current.filter((i) => i !== item)
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
        salaryMin: data.salaryMin ? Number(data.salaryMin) : null,
        salaryMax: data.salaryMax ? Number(data.salaryMax) : null,
      };

      await updateEmployeeProfile(formattedData);
      toast.success("Preferences saved successfully!");
      navigate("/dashboard/professional");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to save preferences.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Work Basics
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">What kind of work are you looking for?</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Full-time", "Part-time", "Contract", "Temporary"].map((type) => (
                <div
                  key={type}
                  onClick={() => setValue("workType", type)}
                  className={`cursor-pointer rounded-xl border p-4 transition-all ${
                    formData.workType === type
                      ? "border-sky-500 bg-sky-50 shadow-sm"
                      : "border-slate-200 hover:border-sky-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="font-medium">{type}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 1: // Compensation & Location
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">Where and for how much?</h3>
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
      case 2: // Culture & Institution
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">Preferred Environment</h3>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Institution Type</label>
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
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
              <label className="mb-2 block text-sm font-medium text-slate-700">Work Culture</label>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Collaborative", "Fast-paced", "Supportive", "Innovative", "Flexible"].map((cult) => (
                  <Badge
                    key={cult}
                    onClick={() => setValue("culture", cult)}
                    variant={formData.culture === cult ? "primary" : "default"}
                    className="cursor-pointer justify-center py-2"
                  >
                    {cult}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 3: // Health Priorities & Languages
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-slate-900">Specialties and Languages</h3>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Health Priorities</label>
              <div className="flex flex-wrap gap-2">
                {["Primary Care", "Pediatrics", "Maternal Health", "Surgery", "Infectious Diseases", "Specialty Care"].map((priority) => (
                  <Badge
                    key={priority}
                    onClick={() => toggleArrayItem("healthPriorities", priority)}
                    variant={formData.healthPriorities?.includes(priority) ? "success" : "default"}
                    className="cursor-pointer"
                  >
                    {priority}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Languages</label>
              <div className="flex flex-wrap gap-2">
                {["Amharic", "English", "Oromo", "Tigrinya", "Somali"].map((lang) => (
                  <Badge
                    key={lang}
                    onClick={() => toggleArrayItem("languages", lang)}
                    variant={formData.languages?.includes(lang) ? "success" : "default"}
                    className="cursor-pointer"
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        );
      case 4: // Free Text
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">Anything else?</h3>
            <Textarea
              label="Additional Notes (Free Text)"
              placeholder="Tell employers about your specific skills, experience, or anything else that might help AI match you better."
              rows={5}
              {...register("freeText")}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      {/* Progress */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Your Preferences</h2>
        <p className="text-slate-500">Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep]}</p>
        <div className="mt-4 flex gap-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full ${
                i <= currentStep ? "bg-sky-500" : "bg-slate-100"
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
          >
            Back
          </Button>

          {currentStep === STEPS.length - 1 ? (
            <Button type="submit" variant="success" loading={isSubmitting}>
              Complete & Match
            </Button>
          ) : (
            <Button type="button" onClick={handleNext}>
              Next Step
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
