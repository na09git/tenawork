import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Avatar from "@/components/ui/avatar/Avatar";

/**
 * TestimonialCard - Reusable testimonial component with avatar, rating, and review
 */
export default function TestimonialCard({
  name,
  role,
  organization,
  review,
  rating = 5,
  avatar,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4 flex gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mb-4 text-neutral-700">{review}</p>
      <div className="flex items-center gap-3">
        <Avatar src={avatar} name={name} size="md" />
        <div>
          <p className="font-semibold text-neutral-900">{name}</p>
          <p className="text-sm text-neutral-600">
            {role} at {organization}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
