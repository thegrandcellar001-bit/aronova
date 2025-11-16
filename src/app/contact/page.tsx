"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function ConciergePage() {
  const [sending, setSending] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const { toastSuccess, toastError } = useToast();

  const handleSubmission = async () => {
    setSending(true);

    try {
      await axios.post("/customer/support", { formData });
      toastSuccess("Message sent.");
    } catch (e) {
      toastError("An error occurred when sending the message.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="max-w-frame mx-auto px-4 xl:px-0 pt-28 pb-10">
      <h1 className="text-3xl font-bold mb-4">Your Curator, Always On Hand.</h1>
      <ul className="list-disc pl-6 text-black/80 space-y-2 mb-6">
        <li>
          <Link href="/account/orders" className="underline">
            Track My Order <i className="far fa-arrow-right ml-1"></i>
          </Link>
        </li>
        <li>
          <a href="/returns" className="underline">
            Returns & Care <i className="far fa-arrow-right ml-1"></i>
          </a>
        </li>
      </ul>
      <p className="text-black/70 max-w-4xl">
        Every Aronova object is authenticated, inspected, and certified before
        delivery. If your discovery does not meet your expectations, you may
        return it within 14 days. Our concierge team will arrange collection and
        ensure the process is seamless.
      </p>

      <div className="max-w-6xl mt-10">
        <h3 className="font-semibold text-2xl mb-1">Reach Out</h3>
        <p className="text-black/70">
          You can reach out to us through the form below.
        </p>
        <div className="flex flex-col gap-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              className="h-12"
              placeholder="Name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              value={formData.name}
              required
            />
            <Input
              type="email"
              className="h-12"
              placeholder="E-mail address"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              value={formData.email}
              required
            />
          </div>
          <div>
            <Input
              type="text"
              className="h-12"
              placeholder="Subject"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subject: e.target.value,
                })
              }
              value={formData.subject}
              required
            />
          </div>
          <div>
            <Textarea
              className="h-32"
              placeholder="Your message"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value,
                })
              }
              value={formData.message}
              required
            ></Textarea>
          </div>
          <Button
            variant="default"
            className="transition cursor-pointer w-fit"
            disabled={
              !formData.email ||
              !formData.message ||
              !formData.name ||
              !formData.subject
            }
          >
            {sending ? (
              "Sending..."
            ) : (
              <Fragment>
                Send Message <i className="fas fa-send" />
              </Fragment>
            )}
          </Button>
        </div>
      </div>

      <div className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl text-center mb-12">Or Reach Us Directly</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-cream rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-sans font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">support@thearonova.com</p>
            </div>
            <div className="text-center p-8 bg-cream rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-sans font-semibold mb-2">Phone</h3>
              <p className="text-muted-foreground">+234 (0) 123 456 7890</p>
            </div>
            <div className="text-center p-8 bg-cream rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-sans font-semibold mb-2">Visit</h3>
              <p className="text-muted-foreground">Victoria Island, Lagos</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
