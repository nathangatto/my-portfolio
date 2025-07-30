"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Star,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "projects",
        "skills",
        "testimonials",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(""); // 'success', 'error', or ''

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("_replyto", formData.email); // Using _replyto like in old code
      formDataToSubmit.append("message", formData.message);

      const response = await fetch("https://formspree.io/f/xvgkpjke", {
        method: "POST",
        body: formDataToSubmit,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ----------------------------- PROJECTS ----------------------------- */
  const projects = [
    {
      title: "Community Café Charity Platform",
      description:
        "Next.js web application that processes secure Stripe donations, showcases upcoming events and allows volunteers to update live impact statistics through a custom admin panel.",
      image: "communitycafe.png",
      tech: ["Next.js", "Stripe", "Node.js", "PostgreSQL"],
      live: "http://communitycafe.org.au",
    },
    {
      title: "Neurolyzer — Brainwave Analysis Desktop App",
      description:
        "Cross‑platform desktop tool built with Python and pyABF that helps neuroscience labs visualise and analyse electrophysiology data on macOS & Windows.",
      image: "neurolyzer.jpg",
      tech: ["Python", "pyABF", "NumPy", "PyInstaller"],
      github: "https://github.com/nathangatto/Neurolyzer",
      live: "#",
    },
    {
      title: "Copilot for Teachers",
      description:
        "An AI‑powered web platform that compares student drafts to your marking rubric and delivers instant, actionable feedback—so learners polish their work and teachers reclaim grading time.",
      image: "copilot.jpg",
      tech: ["Next.js", "PostgreSQL", "OpenAI API", "Tailwind CSS"],
      github: "https://github.com/nathangatto/CoPilot-For-Teachers",
      live: "#",
    },

    {
      title: "MatchMate — World Football Fixtures",
      description:
        "SwiftUI iOS app that delivers live fixtures and results in the user's local timezone. A middleman server caches external API responses to slash bandwidth and speed up performance.",
      image: "matchmate.png",
      tech: ["SwiftUI", "Combine", "Server‑Side Swift", "In‑App Subscriptions"],
      github: "https://github.com/nathangatto/MatchMate",
      live: "#",
    },
    {
      title: "PixelGrain — AI Wallpaper Studio",
      description:
        "SwiftUI iOS application that lets users create bespoke, high‑resolution wallpapers via the OpenAI DALL·E API and monetises with AdMob.",
      image: "pixelgrain.png",
      tech: ["SwiftUI", "OpenAI API", "AdMob", "Core ML"],
      github: "https://github.com/nathangatto/PixelGrainV2",
      live: "#",
    },
  ];

  /* ----------------------------- SKILLS ------------------------------ */
  const skills = [
    {
      category: "Web & Cloud",
      items: ["Next.js", "React", "Node.js", "PostgreSQL", "Stripe"],
    },
    {
      category: "iOS & macOS",
      items: ["Swift", "SwiftUI", "Combine", "Core Data", "AppKit"],
    },
    {
      category: "Data & Scripting",
      items: ["Python", "NumPy", "Pandas", "pyABF", "Shell"],
    },
    {
      category: "Tools & Workflow",
      items: ["Git", "GitHub Actions", "Figma"],
    },
  ];

  /* -------------------------- TESTIMONIALS -------------------------- */
  const testimonials = [
    {
      name: "John Lupton",
      role: "Ambassador, Community Café",
      content: `From the very first meeting with you we found you to be highly professional, informative and customer
                focused. Nothing seemed to be a problem for you in your quest to help us update our image via our website.
                At every point in the process we found you to be incredibly helpful and flexible. We finished with a great result
                within the agreed time frame and as a result we are incredibly appreciative of everything you have done and
                are still doing for us.
                As a small NFP organization it makes a huge difference to work with people like your self and we have no
                hesitation in highly recommending your services to anyone looking for assistance with their website.`,
      rating: 5,
      avatar: "",
    },
    {
      name: "Professor. Yossi Buskila",
      role: "Neuroscience Professor, Western Sydney University",
      content:
        "Collaborating with Nathan on the Neurolyzer project has been an exceptional experience from inception to completion. From our initial discussions, Nathan demonstrated not only technical proficiency but also genuine curiosity and a commitment to comprehending and satisfying our requirements. Throughout the development process, during which my students and I repeatedly refined our specifications, he responded promptly, thoughtfully, and proactively, consistently striving to optimise the application to meet our demands and provide insightful solutions that facilitated our data processing and analysis. The outcome is Neurolyzer: a potent and user-friendly analysis tool that significantly enhances our laboratory operations and streamlines our data analysis, thereby substantially reducing the time required to process the data.",
      rating: 5,
      avatar: "",
    },
    // {
    //   name: "Alex Campos",
    //   role: "Founder, MatchMate",
    //   content:
    //     "Nathan delivered an App Store‑ready iOS app ahead of schedule and nailed every pixel of the design.",
    //   rating: 5,
    //   avatar:
    //     "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
    // },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="font-semibold text-xl text-gray-900">
              Nathan Gatto
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  "home",
                  "about",
                  "projects",
                  "skills",
                  "testimonials",
                  "contact",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                      activeSection === item
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[
                "home",
                "about",
                "projects",
                "skills",
                "testimonials",
                "contact",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg w-full text-left capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-blue-50 to-white"
      >
        <div className="text-center z-10 max-w-4xl mx-auto px-6">
          <div className="mb-8">
            {/* Animated logo using Framer Motion */}
            <motion.div
              whileHover={{ rotate: 360, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="w-32 h-32 mx-auto rounded-full p-1 mb-6 shadow-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
            >
              <motion.img
                src="logo.png"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 120, damping: 12 }}
              />
            </motion.div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 tracking-tight">
            Nathan Gatto
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-light">
            Full‑stack{" "}
            <span className="font-medium text-gray-900">
              Next.js & Apple‑platform specialist
            </span>{" "}
            crafting polished web, iOS & macOS applications that delight users
            and scale with your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection("projects")}
              className="bg-blue-600 text-white px-8 py-4 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 group shadow-lg"
            >
              View My Work
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-medium hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
              About Me
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="aboutme.png"
                alt="Workspace"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Building polished products at the intersection of Web & Apple
                platforms
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed mb-6 font-light">
                I'm a Sydney‑based developer shipping production‑ready software for startups, research labs
                and community organisations. I thrive on turning ideas into
                fast, accessible web apps with Next.js and translating them into
                buttery‑smooth native experiences across the Apple ecosystem.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 font-light">
                From Stripe‑powered donation platforms to neuroscience analysis
                tools and App Store‑ready SwiftUI apps, my focus is always on
                code quality, performance and a delightful user experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
                  <span className="text-blue-600 font-semibold">4</span>{" "}
                  Products Shipped
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
                  <span className="text-blue-600 font-semibold">100%</span>{" "}
                  5‑Star Feedback
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
              A selection of recent work that highlights my ability to deliver
              secure, performant and beautifully‑designed products across web,
              iOS and macOS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 shadow-lg border border-gray-200"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed font-light">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm border border-blue-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.live}
                      className="text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
              Skills & Technologies
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors group border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-600 group-hover:text-blue-700 transition-colors">
                  {skillGroup.category}
                </h3>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700 font-light">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
              What Clients Say
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow group border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  {/* <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  /> */}
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm font-light">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-500 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed italic font-light">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
              Have an idea for a web or Apple‑platform app? I'd love to hear
              about it and discuss how we can bring it to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                Let's start a conversation
              </h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Mail className="text-blue-600 mr-4" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600 font-light">
                      nathangatto3@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="text-blue-600 mr-4" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <p className="text-gray-600 font-light">0403 662 711</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-blue-600 mr-4" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">Location</p>
                    <p className="text-gray-600 font-light">
                      Sydney, Australia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" mx-xl p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Send me a message
              </h3>

              {submitStatus === "success" && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  There was an error sending your message. Please try again.
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                <button
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 shadow-lg disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-gray-600 font-light">© 2025 Nathan Gatto.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
