import { useState } from 'react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // clear error on change
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error('Please fix the errors below');
      return;
    }

    console.log('Form submitted:', formData);

    toast.success('Message sent successfully!');

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  const inputBase =
    'w-full px-4 py-3 bg-[var(--primary-input)] text-[var(--text-primary)] rounded-md border border-white/40 focus:border-[var(--primary-blue)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] transition-all font-[var(--font-mulish)]';

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      <div className="bg-[var(--primary-card)] rounded-lg p-6 sm:p-8 lg:p-12 shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-semibold text-[var(--text-primary)] font-[var(--font-montserrat)] mb-2">
          Contact Us
        </h1>
        <p className="text-[var(--text-secondary)] font-[var(--font-mulish)] mb-8">
          Have a question or feedback? We'd love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-[var(--text-primary)] font-[var(--font-montserrat)] font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`${inputBase} ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-[var(--text-primary)] font-[var(--font-montserrat)] font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`${inputBase} ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-[var(--text-primary)] font-[var(--font-montserrat)] font-medium mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className={`${inputBase} ${errors.name ? 'border-red-500' : ''}`}
              placeholder="What is this about?"
            />
            {errors.subject && (
              <p className="mt-1 text-sm text-red-400">{errors.subject}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-[var(--text-primary)] font-[var(--font-montserrat)] font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className={`${inputBase} resize-none ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Your message..."
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-[var(--primary-blue)] text-[var(--text-primary)] rounded-md font-[var(--font-montserrat)] font-semibold hover:bg-opacity-80 transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              Send Message
            </button>
            <button
              type="button"
              onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
              className="px-8 py-3 text-[var(--primary-input)] text-[var(--text-secondary)] rounded-md font-[var(--font-montserrat)] font-medium hover:bg-opacity-80 transition-colors cursor-pointer"
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}