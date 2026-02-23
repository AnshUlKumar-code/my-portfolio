// components/Services.jsx
import { FiLayout, FiServer, FiDatabase, FiCloud } from 'react-icons/fi'

const Services = () => {
  const services = [
    {
      icon: <FiLayout size={32} />,
      title: 'Frontend Development',
      description: 'Building responsive and interactive user interfaces with React, Next.js, and modern CSS frameworks.',
      techs: ['React', 'Next.js', 'Tailwind CSS']
    },
    {
      icon: <FiServer size={32} />,
      title: 'Backend Development',
      description: 'Creating robust APIs and server-side applications with Node.js, Express, and Python.',
      techs: ['Node.js', 'Express', 'Python']
    },
    {
      icon: <FiDatabase size={32} />,
      title: 'Database Design',
      description: 'Designing and optimizing databases with MongoDB, PostgreSQL for scalable applications.',
      techs: ['MongoDB', 'PostgreSQL', 'Redis']
    },
    {
      icon: <FiCloud size={32} />,
      title: 'DevOps & Deployment',
      description: 'Setting up CI/CD pipelines, Docker containers, and cloud deployment on AWS.',
      techs: ['Docker', 'AWS', 'CI/CD']
    }
  ]

  return (
    <section id="services" className="py-20 px-4 bg-primary-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Full stack solutions for your digital needs, from concept to deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="card group hover:-translate-y-2"
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-400 mb-6">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {service.techs.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary-bg border border-primary-border rounded-full text-sm text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services