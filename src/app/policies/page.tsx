"use client";


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VENUE_INFO } from "@/lib/types";

export default function PoliciesPage() {
  const policies = [
    {
      title: "Age Restrictions",
      content: "Most shows are 21+ unless otherwise specified. Valid photo ID required for entry. Some all-ages shows available - check individual event listings.",
      icon: "🆔"
    },
    {
      title: "Dress Code",
      content: "Casual dress is welcome. We recommend comfortable shoes for standing shows. No offensive clothing or gang-related attire permitted.",
      icon: "👕"
    },
    {
      title: "Security & Safety",
      content: "Security bag checks at entry. No outside food, drinks, or weapons permitted. Professional security staff on-site for all events.",
      icon: "🔒"
    },
    {
      title: "Prohibited Items",
      content: "No outside alcohol, professional cameras, recording devices, weapons, or illegal substances. Phones for personal use are welcome.",
      icon: "🚫"
    },
    {
      title: "Accessibility",
      content: "ADA accessible venue with wheelchair access and designated seating areas. Please contact us in advance for special accommodations.",
      icon: "♿"
    },
    {
      title: "Parking",
      content: "Street parking available on SE Grand Ave and surrounding streets. Public transportation recommended. Bike parking available.",
      icon: "🚗"
    }
  ];

  const faqs = [
    {
      question: "What time do doors typically open?",
      answer: "Doors usually open at 7:00 PM, but times vary by event. Check your ticket or the specific show listing for exact times."
    },
    {
      question: "Can I get a refund if I can't attend?",
      answer: "Refund policies vary by event and ticket vendor. Contact the ticket seller directly for refund requests. We cannot process refunds for third-party ticket sales."
    },
    {
      question: "Is there food available at the venue?",
      answer: "We offer a selection of bar snacks and light appetizers. Full meals are not available, but there are many great restaurants nearby on SE Grand Ave."
    },
    {
      question: "Can I bring a camera?",
      answer: "Personal phones are welcome for photos and videos. Professional cameras and recording equipment require prior approval from venue management and the performing artist."
    },
    {
      question: "What's the best way to get to Swan Dive PDX?",
      answer: "We're located at 727 SE Grand Ave, easily accessible by bus, bike, or car. Street parking is available, and we're bike-friendly with secure bike parking."
    },
    {
      question: "Do you have a coat check?",
      answer: "Yes, we offer complimentary coat check service during events. Items are checked at your own risk."
    },
    {
      question: "Can I reserve a table or VIP area?",
      answer: "VIP packages and table reservations are available for select shows. Contact us at (503) 227-7777 or check the specific event listing for availability."
    },
    {
      question: "What if the show is cancelled?",
      answer: "In the rare event of cancellation, refunds will be automatically processed by the ticket vendor. We'll also announce cancellations on our social media and website."
    },
    {
      question: "Is re-entry allowed?",
      answer: "Re-entry policies vary by event. Most shows allow re-entry with a hand stamp and valid ticket, but some special events may not permit re-entry."
    },
    {
      question: "How can I submit music for consideration?",
      answer: "Send your EPK (Electronic Press Kit) to booking@swandivepdx.com. Include bio, music samples, tour history, and preferred dates. We review all submissions."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-teal-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Venue Policies & FAQ
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know for your visit to {VENUE_INFO.name}
          </p>
        </div>

        {/* Venue Policies */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Venue Policies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {policies.map((policy, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="text-4xl mb-3">{policy.icon}</div>
                  <CardTitle className="text-lg">{policy.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{policy.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Information */}
        <div className="mb-16 bg-red-50 border border-red-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-3">
            <span>🚨</span> Emergency Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-red-800">
            <div>
              <p className="font-semibold mb-2">Emergency Exits:</p>
              <p>Clearly marked exits located at front entrance, stage left, and rear of venue.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">First Aid:</p>
              <p>Trained staff on-site. Nearest hospital: OHSU - 0.8 miles northeast.</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Emergency Contact:</p>
              <p>Call 911 or venue emergency line: (503) 227-7777</p>
            </div>
            <div>
              <p className="font-semibold mb-2">Assembly Point:</p>
              <p>SE Grand Ave sidewalk in front of venue (away from building).</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-teal-700 flex items-center gap-2">
                    <span className="text-teal-600">Q:</span>
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed pl-6">
                    <span className="text-teal-600 font-semibold">A:</span> {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center bg-slate-900 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-white mb-4">
            Still have questions?
          </h3>
          <p className="text-gray-300 text-lg mb-6 max-w-2xl mx-auto">
            Our friendly staff is here to help. Contact us anytime with questions about events, policies, or bookings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:(503) 227-7777"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Call {VENUE_INFO.phone}
            </a>
            <a
              href="mailto:info@swandivepdx.com"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
