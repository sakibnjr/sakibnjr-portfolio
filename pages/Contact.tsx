"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { FiSend, FiMail, FiMapPin, FiClock } from "react-icons/fi";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const Contact: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiMail className="h-5 w-5 text-primary" />,
      title: "Email",
      content: "sakibnjr@proton.me",
    },
    {
      icon: <FiMapPin className="h-5 w-5 text-primary" />,
      title: "Location",
      content: "Dhaka, Bangladesh",
    },
    {
      icon: <FiClock className="h-5 w-5 text-primary" />,
      title: "Availability",
      content: "Available for freelance & full-time opportunities",
    },
  ];

  const formFields = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Your Name",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "you@example.com",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative container mx-auto min-h-[90vh] flex flex-col justify-center items-center overflow-hidden"
    >
      <motion.div
        className="w-full max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            variants={itemVariants}
            className="w-full lg:w-1/2 text-left"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4"
            >
              Let&apos;s Build Something Amazing
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground mb-8"
            >
              Whether you have a project in mind or just want to explore
              possibilities, I&apos;m here to help bring your vision to life.
            </motion.p>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div variants={itemVariants} className="w-full lg:w-1/2">
            <div className="bg-card border border-border/50 rounded-lg p-6 sm:p-8 shadow-xl">
              <motion.h3
                variants={itemVariants}
                className="text-xl sm:text-2xl font-semibold text-foreground mb-6"
              >
                Send Me a Message
              </motion.h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {formFields.map((field) => (
                  <motion.div key={field.id} variants={itemVariants}>
                    <label
                      htmlFor={field.id}
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      {field.label}
                    </label>
                    <Input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      placeholder={field.placeholder}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={handleChange}
                      required
                      className="bg-background border-input focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                    />
                  </motion.div>
                ))}
                <motion.div variants={itemVariants}>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-muted-foreground mb-1"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="bg-background border-input focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    <FiSend className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
