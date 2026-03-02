import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useApp } from "../context/AppContext";
import { motion } from "motion/react";

export default function TopPerformers() {
  const { officers } = useApp();

  // Sort officers by rating and get top 3
  const topOfficers = [...officers]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-12 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Top Performing Officers</h3>
          <p className="text-gray-600">Recognizing excellence in public service</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {topOfficers.map((officer, index) => (
            <motion.div
              key={officer.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-2 border-blue-100 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-center">
                    {/* Rank Badge */}
                    {index === 0 && (
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-yellow-900 font-bold text-sm mb-3">
                        1
                      </div>
                    )}
                    {index === 1 && (
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-700 font-bold text-sm mb-3">
                        2
                      </div>
                    )}
                    {index === 2 && (
                      <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-400 text-orange-900 font-bold text-sm mb-3">
                        3
                      </div>
                    )}

                    {/* Profile Photo */}
                    <div className="relative mx-auto w-24 h-24 mb-4">
                      <img
                        src={officer.photo}
                        alt={officer.name}
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                      />
                    </div>

                    {/* Officer Details */}
                    <h4 className="font-bold text-lg text-gray-900 mb-1">{officer.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{officer.designation}</p>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{officer.ministryName}</p>

                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(officer.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : i < officer.rating
                                ? "fill-yellow-200 text-yellow-400"
                                : "fill-gray-200 text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-900">{officer.rating.toFixed(1)}</span>
                    </div>

                    {/* Stats */}
                    <div className="bg-green-50 rounded-lg py-2 px-3 mt-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-bold text-green-600">{officer.totalResolved}</span> cases resolved
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}