import { motion } from "framer-motion";

const FeatureCard = ({ icon, title, description }: any) => (
  <motion.div
    className="bg-card p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

export default FeatureCard;
