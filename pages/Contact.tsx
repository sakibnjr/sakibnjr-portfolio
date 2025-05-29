"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { FiSend, FiMail, FiMapPin, FiClock } from "react-icons/fi";

// Enhanced animation variants
const fadeInVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const contactInfoVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const formVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Contact: React.FC = () => {
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative container mx-auto py-12 min-h-screen flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInVariants}
            className="w-full lg:w-1/2 text-left"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
            >
              Let&apos;s Build Something Amazing
              
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Whether you have a project in mind or just want to explore
              possibilities, I&apos;m here to help bring your vision to life.
            </motion.p>

            {/* Contact Info */}
            <div className="space-y-6">
              {[
                {
                  icon: <FiMail className="h-6 w-6 text-primary" />,
                  title: "Email",
                  content: "sakibnjr@proton.me",
                },
                {
                  icon: <FiMapPin className="h-6 w-6 text-primary" />,
                  title: "Location",
                  content: "Dhaka, Bangladesh",
                },
                {
                  icon: <FiClock className="h-6 w-6 text-primary" />,
                  title: "Availability",
                  content: "Available for freelance & full-time opportunities",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  custom={index}
                  variants={contactInfoVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    className="mt-1"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {item.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            ref={formRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={formVariants}
            className="w-full lg:w-1/2"
          >
            <motion.div
              className="bg-card border border-border/50 rounded-lg p-6 sm:p-8 shadow-xl dark:bg-background dark:border-gray-100/50"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl font-semibold text-foreground mb-6"
              >
                Send Me a Message
              </motion.h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
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
                ].map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                  >
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
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
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
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full"
                >
                  <Button type="submit" size="lg" className="w-full">
                    <FiSend className="mr-2 h-5 w-5" /> Send Message
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
