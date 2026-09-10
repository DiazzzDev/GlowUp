import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SURVEY_QUESTIONS } from '../../../constants/mockData';

export const SurveyScreen = ({ navigation }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelect = (questionId, optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleFinish = () => {
    setIsCompleted(true);
  };

  return (
    <View className="flex-1 bg-[#F0FBF9]">
      <StatusBar barStyle="dark-content" backgroundColor="#F0FBF9" />

      {/* Header */}
      <View className="flex-row items-center px-5 pt-12 pb-3 bg-[#F0FBF9]">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="w-9 h-9 rounded-full bg-white border border-[#D7EFEA] items-center justify-center mr-3"
        >
          <Text className="text-[#1A2B29] text-lg font-bold">‹</Text>
        </TouchableOpacity>
        <Text className="text-[#1A2B29] text-2xl font-extrabold">Test de Rutina</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 60 }}
      >
        {!isCompleted ? (
          <>
            <Text className="text-[#8C9EA0] text-sm mb-6">
              Responde las siguientes preguntas para descubrir los ingredientes y productos específicos para tu tipo de piel.
            </Text>

            {SURVEY_QUESTIONS.map((q, qIndex) => (
              <View
                key={q.id}
                className="bg-white border border-[#D7EFEA] rounded-3xl p-5 mb-5 shadow-xs"
              >
                <Text className="text-[#17C3B2] text-xs font-bold uppercase mb-1">
                  Pregunta {qIndex + 1} de {SURVEY_QUESTIONS.length}
                </Text>
                <Text className="text-[#1A2B29] text-base font-bold mb-4">
                  {q.question}
                </Text>

                {q.options.map((opt, oIndex) => {
                  const isSelected = selectedAnswers[q.id] === oIndex;
                  return (
                    <TouchableOpacity
                      key={oIndex}
                      onPress={() => handleSelect(q.id, oIndex)}
                      activeOpacity={0.8}
                      className={`p-3.5 rounded-2xl border mb-2.5 flex-row items-center justify-between ${
                        isSelected
                          ? 'bg-[#E0F7F5] border-[#17C3B2]'
                          : 'bg-white border-[#D7EFEA]'
                      }`}
                    >
                      <Text
                        className={`text-sm font-medium ${
                          isSelected ? 'text-[#17C3B2] font-bold' : 'text-[#1A2B29]'
                        }`}
                      >
                        {opt.label}
                      </Text>
                      <View
                        className={`w-4 h-4 rounded-full border-2 items-center justify-center ${
                          isSelected ? 'border-[#17C3B2]' : 'border-[#8C9EA0]'
                        }`}
                      >
                        {isSelected && <View className="w-2 h-2 rounded-full bg-[#17C3B2]" />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            <TouchableOpacity
              onPress={handleFinish}
              activeOpacity={0.85}
              className="w-full bg-[#17C3B2] py-4 rounded-2xl items-center shadow-md mt-2"
            >
              <Text className="text-white text-base font-bold">
                Descubrir mi rutina
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <View className="bg-white border border-[#D7EFEA] rounded-3xl p-6 items-center my-6 shadow-sm">
            <View className="w-16 h-16 rounded-full bg-[#E0F7F5] items-center justify-center mb-4">
              <Text className="text-3xl">✨</Text>
            </View>
            <Text className="text-[#1A2B29] text-2xl font-extrabold text-center mb-2">
              Tu Rutina Recomendada
            </Text>
            <Text className="text-[#17C3B2] text-sm font-bold text-center mb-4">
              Rutina Hidratante Equilibrante & Barrera
            </Text>
            <Text className="text-[#8C9EA0] text-sm text-center mb-6 leading-relaxed">
              Basado en tus respuestas, tu piel se beneficiará enormemente de ceramidas, ácido hialurónico y protector solar matificante toque seco.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              className="w-full bg-[#17C3B2] py-3.5 rounded-2xl items-center"
            >
              <Text className="text-white font-bold">Ver Productos Recomendados</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default SurveyScreen;
