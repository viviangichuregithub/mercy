'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Label from "@/components/ui/label";
import toast from "react-hot-toast";
import { Mail, Phone, Clock, Send, MessageCircle, Heart, Globe } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Message Sent! Thank you for reaching out.");
    setFormData({ name: "", email: "", organization: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: Mail, title: "Email Us", details: "munenefrank11@gmail.com", description: "We typically respond within 24 hours" },
    { icon: Phone, title: "Call Us", details: "+254 759060958", description: "Monday - Friday, 9AM - 6PM EAT" },
    { icon: Clock, title: "Support Hours", details: "24/7 Emergency Support", description: "For critical infrastructure issues" }
  ];

  const reasons = [
    { icon: MessageCircle, title: "General Inquiry", description: "Questions about our services or platform" },
    { icon: Heart, title: "Partnership", description: "Collaborate with us on NGO initiatives" },
    { icon: Globe, title: "Technical Support", description: "Need help with your cloud infrastructure" }
  ];

  return (
    <div className="bg-gray-50 text-gray-900 py-12 px-4 font-inter">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-blue-600 mb-2"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-600 max-w-xl mx-auto"
        >
          Have questions about our platform? Want to partner with us? We'd love to hear from you.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Form */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="bg-white shadow-md p-6 rounded-lg">
            <CardHeader>
              <CardTitle className="text-blue-600">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="organization">Organization</Label>
                  <Input
                    id="organization"
                    value={formData.organization}
                    onChange={(e) => handleChange("organization", e.target.value)}
                    placeholder="Your organization name"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Tell us more..."
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isSubmitting ? "Sending..." : <>Send Message <Send className="ml-1" /></>}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Info & Reasons */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <div key={idx} className="bg-white shadow p-4 rounded-md flex items-start gap-3">
                <div className="text-blue-600 text-xl"><Icon /></div>
                <div>
                  <h4 className="font-semibold text-blue-600">{info.title}</h4>
                  <p className="text-sm text-gray-800">{info.details}</p>
                  <p className="text-xs text-gray-600">{info.description}</p>
                </div>
              </div>
            );
          })}

          {reasons.map((reason, idx) => {
            const Icon = reason.icon;
            return (
              <div key={idx} className="bg-white shadow p-4 rounded-md flex items-start gap-3">
                <div className="text-blue-600 text-xl"><Icon /></div>
                <div>
                  <h4 className="font-semibold text-blue-600">{reason.title}</h4>
                  <p className="text-xs text-gray-600">{reason.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
