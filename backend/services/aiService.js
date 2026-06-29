const languageMap = {
  English: { greeting: 'Big news!', cta: 'Visit today and grab this offer before it ends.' },
  Hindi: { greeting: 'बड़ी खुशखबरी!', cta: 'आज ही विजिट करें और ऑफर का फायदा उठाएं।' },
  Marathi: { greeting: 'मोठी खुशखबर!', cta: 'आजच भेट द्या आणि ऑफरचा लाभ घ्या.' },
  Gujarati: { greeting: 'મોટી ખુશખબર!', cta: 'આજે જ મુલાકાત લો અને ઓફરનો લાભ લો.' },
  Tamil: { greeting: 'சிறந்த செய்தி!', cta: 'இன்றே வருகை தந்து இந்த சலுகையை பெறுங்கள்.' }
};

const hashtags = {
  English: ['#LocalBusiness', '#ShopLocal', '#SpecialOffer', '#IndiaBusiness'],
  Hindi: ['#LocalBusiness', '#Offer', '#ShopLocal', '#India'],
  Marathi: ['#LocalBusiness', '#Maharashtra', '#Offer', '#ShopLocal'],
  Gujarati: ['#LocalBusiness', '#GujaratiBusiness', '#Offer', '#ShopLocal'],
  Tamil: ['#LocalBusiness', '#TamilBusiness', '#Offer', '#ShopLocal']
};

function tonePrefix(tone) {
  const tones = {
    Friendly: 'warm and friendly',
    Professional: 'clear and professional',
    Festive: 'celebration-style festive',
    Urgent: 'limited-time urgent'
  };
  return tones[tone] || 'friendly';
}

function buildEnglish(input) {
  const { businessName, businessType, offer, targetAudience, platform, tone } = input;
  const style = tonePrefix(tone);
  return {
    shortCaption: `🎉 ${businessName} brings you ${offer}! Perfect for ${targetAudience}.`,
    whatsappMessage: `Hi! ${businessName}, your trusted ${businessType}, has a special offer: ${offer}. This is perfect for ${targetAudience}. ${languageMap.English.cta}`,
    instagramCaption: `✨ ${businessName} is here with ${offer}!\n\nMade for ${targetAudience}. Visit now and experience the best from your local ${businessType}.\n\n${hashtags.English.join(' ')}`,
    voiceScript: `${languageMap.English.greeting} ${businessName} is offering ${offer}. Perfect for ${targetAudience}. Visit today and don't miss this special ${style} offer.`,
    callToAction: platform === 'WhatsApp' ? 'Tap to message us now!' : 'Visit today and claim your offer!'
  };
}

function localize(input, english) {
  const { language, businessName, businessType, offer, targetAudience, tone } = input;
  if (language === 'English') return english;
  const local = languageMap[language] || languageMap.English;
  const tag = (hashtags[language] || hashtags.English).join(' ');

  const translations = {
    Hindi: {
      shortCaption: `🎉 ${businessName} पर ${offer}! ${targetAudience} के लिए खास ऑफर।`,
      whatsappMessage: `नमस्ते! ${businessName} (${businessType}) लेकर आया है ${offer}. ${targetAudience} के लिए बेहतरीन मौका। ${local.cta}`,
      instagramCaption: `✨ ${businessName} पर शानदार ऑफर: ${offer}!\n\n${targetAudience} के लिए खास। जल्दी आइए और अपने लोकल बिजनेस को सपोर्ट करें।\n\n${tag}`,
      voiceScript: `${local.greeting} ${businessName} में ${offer}. ${targetAudience} के लिए खास मौका। ${local.cta}`,
      callToAction: 'अभी संपर्क करें!'
    },
    Marathi: {
      shortCaption: `🎉 ${businessName} मध्ये ${offer}! ${targetAudience} साठी खास संधी.`,
      whatsappMessage: `नमस्कार! ${businessName} (${businessType}) घेऊन आले आहे ${offer}. ${targetAudience} साठी उत्तम ऑफर. ${local.cta}`,
      instagramCaption: `✨ ${businessName} मध्ये जबरदस्त ऑफर: ${offer}!\n\n${targetAudience} साठी खास. आपल्या लोकल बिझनेसला सपोर्ट करा.\n\n${tag}`,
      voiceScript: `${local.greeting} ${businessName} मध्ये ${offer}. ${targetAudience} साठी ही खास संधी आहे. ${local.cta}`,
      callToAction: 'आत्ताच संपर्क करा!'
    },
    Gujarati: {
      shortCaption: `🎉 ${businessName} માં ${offer}! ${targetAudience} માટે ખાસ તક.`,
      whatsappMessage: `નમસ્તે! ${businessName} (${businessType}) લઈને આવ્યું છે ${offer}. ${targetAudience} માટે ખાસ ઓફર. ${local.cta}`,
      instagramCaption: `✨ ${businessName} માં ખાસ ઓફર: ${offer}!\n\n${targetAudience} માટે શ્રેષ્ઠ તક. લોકલ બિઝનેસને સપોર્ટ કરો.\n\n${tag}`,
      voiceScript: `${local.greeting} ${businessName} માં ${offer}. ${targetAudience} માટે ખાસ તક. ${local.cta}`,
      callToAction: 'હમણાં સંપર્ક કરો!'
    },
    Tamil: {
      shortCaption: `🎉 ${businessName} இல் ${offer}! ${targetAudience} க்கான சிறப்பு சலுகை.`,
      whatsappMessage: `வணக்கம்! ${businessName} (${businessType}) வழங்குகிறது ${offer}. ${targetAudience} க்கான சிறந்த வாய்ப்பு. ${local.cta}`,
      instagramCaption: `✨ ${businessName} இல் சிறப்பு சலுகை: ${offer}!\n\n${targetAudience} க்கான அருமையான வாய்ப்பு. உள்ளூர் வணிகத்தை ஆதரிக்கவும்.\n\n${tag}`,
      voiceScript: `${local.greeting} ${businessName} இல் ${offer}. ${targetAudience} க்கான சிறப்பு வாய்ப்பு. ${local.cta}`,
      callToAction: 'இப்போது தொடர்பு கொள்ளுங்கள்!'
    }
  };

  return translations[language] || english;
}

export function generateMarketingCampaign(input) {
  const english = buildEnglish(input);
  const localized = localize(input, english);

  // Future: Replace this template engine with OpenAI, Gemini, or AWS Bedrock.
  return {
    ...localized,
    meta: {
      generatedBy: 'Mock AI Template Engine',
      language: input.language,
      platform: input.platform,
      tone: input.tone,
      businessType: input.businessType
    }
  };
}
