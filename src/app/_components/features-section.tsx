import { Brain, Sparkles, MessageCircle } from "lucide-react";

export default function FeaturesSection() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
      <h3 className="text-2xl font-semibold text-center mb-8 text-gray-800">
        AI-Powered Recruitment Analysis
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-green-600" />
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">Skill Assessment</h4>
          <p className="text-gray-600 text-sm">
            Analyze technical skills, experience levels, and competency gaps for
            specific roles
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-orange-600" />
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">Role Suitability</h4>
          <p className="text-gray-600 text-sm">
            Get detailed insights about candidate fit for specific positions and
            requirements
          </p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">Smart Insights</h4>
          <p className="text-gray-600 text-sm">
            Discover hidden strengths, career progression patterns, and hiring
            recommendations
          </p>
        </div>
      </div>
    </div>
  );
}
