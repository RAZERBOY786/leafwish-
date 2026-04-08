import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, SafeAreaView, Image } from 'react-native';
import { getDiseaseInfo, parseDiseaseClass } from './constants/diseases';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: '#388E3C',
  primaryDark: '#1B5E20',
  white: '#FFFFFF',
  background: '#FBF8F5',
  card: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#6D4C41',
  border: '#E0E0E0',
  warning: '#E53935',
  noteBackground: '#F5EFE6',
};

export default function ResultScreen() {
  const router = useRouter();
  const { disease, confidence, imageUri } = useLocalSearchParams<{ disease: string; confidence: string; imageUri: string }>();
  const parsedConfidence = parseFloat(confidence || '0');
  const diseaseClass = disease || 'Unknown';
  const { plant, disease: diseaseName } = parseDiseaseClass(diseaseClass);
  const info = getDiseaseInfo(diseaseClass);

  const confidenceLevel = parsedConfidence * 100;
  const confidenceColor = confidenceLevel > 75 ? COLORS.primary : confidenceLevel > 50 ? '#F9A825' : COLORS.warning;

  // Descriptions for About This Condition
  const descriptions: { [key: string]: string } = {
    'Pepper___bell___bacterial_spot': `
Bacterial spot on bell peppers is caused by Xanthomonas bacteria. Symptoms include water-soaked lesions on leaves that dry to brown spots, raised cankers on stems, and cracked lesions on fruit. Favored by warm, wet conditions, it spreads via wind-driven rain and infected seeds. Early detection prevents yield loss.
`.trim(),

    'Pepper___bell___healthy': `
Your bell pepper plant appears healthy with no signs of disease or pests. Maintain good cultural practices like proper watering, spacing, and fertilization to keep it thriving.
`.trim(),

    'Potato___Early_blight': `
Early blight on potatoes, caused by the fungus Alternaria solani, features dark concentric spots with yellow halos on lower leaves, leading to blight and defoliation. It thrives in warm, humid weather and survives on debris. Affects yield by reducing photosynthesis.
`.trim(),

    'Potato___healthy': `
Your potato plant is healthy, showing vigorous growth without disease symptoms. Continue monitoring and provide balanced care for optimal tuber production.
`.trim(),

    'Potato___Late_blight': `
Late blight, caused by Phytophthora infestans, produces irregularly shaped dark brown lesions on leaves, stems, and tubers, often with white fuzzy growth underneath. It spreads rapidly in cool, moist conditions, potentially devastating entire crops like the Irish Potato Famine.
`.trim(),

    'Tomato___Target_Spot': `
Target spot on tomatoes, caused by Corynespora cassiicola fungus, starts as small water-soaked spots on leaves that enlarge into necrotic lesions with concentric rings and dark margins. Fruits develop sunken brown flecks that pit. Favors high humidity and temperatures.
`.trim(),

    'Tomato___mosaic_virus': `
Tomato mosaic virus (ToMV) causes mottled, mosaic-patterned leaves with light and dark green areas, leaf distortion, and stunted growth. Transmitted mechanically via tools, hands, or infected debris; related to tobacco mosaic virus. No cure; focus on prevention.
`.trim(),

    'Tomato___yellow_leaf_curl_virus': `
Tomato yellow leaf curl virus (TYLCV), a begomovirus transmitted by whiteflies, causes upward-curling leaves, yellowing margins, stunted growth, and flower drop. Severe in warm climates; leads to significant yield loss. Resistant varieties and vector control are key.
`.trim(),

    'Tomato_Bacterial_spot': `
Bacterial spot on tomatoes, caused by Xanthomonas species, appears as small water-soaked leaf spots that turn dark with yellow halos, and raised lesions on fruit. Spreads in wet, warm weather; confirmed by oozing exudate from cut leaves. Reduces fruit quality.
`.trim(),

    'Tomato_Early_blight': `
Early blight, caused by Alternaria solani, shows as oval leaf lesions with yellow halos and concentric rings, progressing to stem cankers and fruit spots at the shoulders. Favors humid conditions; common on lower leaves, reducing photosynthesis and yield.
`.trim(),

    'Tomato_healthy': `
Your tomato plant is healthy, exhibiting normal green foliage and growth. Regular monitoring and proper care will ensure a bountiful harvest.
`.trim(),

    'Tomato_Late_blight': `
Late blight on tomatoes, from Phytophthora infestans, creates water-soaked leaf lesions that turn brown with white mold on undersides, affecting stems and fruits. Thrives in cool, wet weather; can destroy crops quickly if unmanaged.
`.trim(),

    'Tomato_Leaf_Mold': `
Tomato leaf mold, caused by Passalora fulva, displays yellow spots on upper leaf surfaces with olive-green velvety mold below. Leads to defoliation and reduced yield in high-humidity environments like greenhouses.
`.trim(),

    'Tomato_Septoria_leaf_spot': `
Septoria leaf spot, from Septoria lycopersici, starts as small water-soaked spots on lower leaves, becoming gray-white with dark margins and black fruiting bodies. Spreads in wet conditions; causes premature defoliation.
`.trim(),

    'Tomato_Spider_mites_Two_spotted_spider_mite': `
Two-spotted spider mites (Tetranychus urticae) cause stippling and yellowing of leaves, bronzing, and fine webbing on undersides. Tiny mites feed on plant sap in hot, dry conditions, leading to leaf drop and reduced vigor.
`.trim(),

'Unknown': `
No specific information available for this condition. Consult a local agricultural extension for diagnosis and advice.
`.trim(),
  };

const description = descriptions[diseaseClass] || info.description || 'No description available for this condition.';

  // Specific recovery plans based on disease class
  const recoveryPlans: { [key: string]: string } = {
    'Pepper___bell___bacterial_spot': `
Professional 15-Day Recovery Plan for Bacterial Spot on Bell Pepper:
Day 1-3: Remove and destroy infected leaves/fruit. Apply copper-based bactericide (e.g., fixed copper) per label (1-2 tbsp/gallon). Spray thoroughly, including undersides, wearing PPE. Prune for airflow; avoid overhead watering.
Day 4-7: Monitor daily; reapply copper every 7 days if wet. Use drip irrigation; mulch to suppress weeds.
Day 8-10: Alternate with mancozeb if available; improve ventilation and spacing.
Day 11-15: Final copper application; fertilize balanced NPK. Long-term: Rotate crops 3 years, use resistant varieties.
`.trim(),

    'Pepper___bell___healthy': `
Maintenance Plan for Healthy Bell Pepper:
Day 1-3: Inspect plants; ensure proper spacing and staking for airflow. Apply balanced fertilizer if needed.
Day 4-7: Water via drip irrigation; mulch to retain moisture and suppress weeds.
Day 8-10: Prune suckers; monitor for pests/diseases.
Day 11-15: Harvest regularly; rotate crops next season.
Long-term: Use disease-free seed, avoid overhead watering.
`.trim(),

    'Potato___Early_blight': `
Professional 15-Day Recovery Plan for Early Blight on Potato:
Day 1-3: Remove infected lower leaves; apply chlorothalonil or mancozeb fungicide per label. Mulch to prevent splash; prune for airflow.
Day 4-7: Monitor; reapply fungicide every 7-10 days in wet conditions. Use drip irrigation.
Day 8-10: Alternate fungicides (e.g., azoxystrobin); hill soil around plants.
Day 11-15: Final application; harvest mature tubers carefully. Long-term: Rotate 2-3 years, resistant varieties.
`.trim(),

    'Potato___healthy': `
Maintenance Plan for Healthy Potato:
Day 1-3: Hill soil around plants; ensure even watering.
Day 4-7: Monitor for issues; apply balanced fertilizer.
Day 8-10: Control weeds; avoid overhead watering.
Day 11-15: Harvest when ready; cure tubers.
Long-term: Rotate crops, use certified seed.
`.trim(),

    'Potato___Late_blight': `
Professional 15-Day Recovery Plan for Late Blight on Potato:
Day 1-3: Destroy infected plants/culls; apply chlorothalonil or mandipropamid fungicide. Avoid overhead watering; space for airflow.
Day 4-7: Monitor; reapply every 5-7 days. Destroy volunteers.
Day 8-10: Alternate fungicides (e.g., fluazinam); hill soil.
Day 11-15: Final spray; harvest and cure tubers dry. Long-term: Rotate 3 years, resistant varieties.
`.trim(),

    'Tomato___Target_Spot': `
Professional 15-Day Recovery Plan for Target Spot on Tomato:
Day 1-3: Remove infected leaves; apply chlorothalonil or mancozeb fungicide. Prune for airflow; mulch.
Day 4-7: Monitor; reapply every 7-10 days if humid. Drip irrigation.
Day 8-10: Alternate with azoxystrobin; improve spacing.
Day 11-15: Final application; fertilize balanced. Long-term: Rotate 3 years.
`.trim(),

    'Tomato___mosaic_virus': `
Management Plan for Tomato Mosaic Virus:
Day 1-3: Remove and destroy infected plants immediately. Disinfect tools/hands with soap; no smoking near plants.
Day 4-7: Plant resistant varieties next season; rogue any new symptoms.
Day 8-10: Control aphids mechanically; ensure virus-free seed.
Day 11-15: Monitor; sanitize greenhouse if applicable.
Long-term: Use certified seed, clean tools. No cure—focus on prevention.
`.trim(),

    'Tomato___yellow_leaf_curl_virus': `
Management Plan for Tomato Yellow Leaf Curl Virus:
Day 1-3: Remove infected plants; control whiteflies with insecticidal soap or neem. Use reflective mulch.
Day 4-7: Monitor vectors; apply systemic insecticide if needed (rotate).
Day 8-10: Prune for airflow; destroy weeds.
Day 11-15: Harvest unaffected fruit; plant resistant varieties next.
Long-term: Resistant cultivars, weed control. No cure—prevent vector spread.
`.trim(),

    'Tomato_Bacterial_spot': `
Professional 15-Day Recovery Plan for Bacterial Spot on Tomato:
Day 1-3: Remove infected parts; apply copper bactericide. Prune airflow; avoid overhead.
Day 4-7: Reapply copper every 7 days if wet; drip irrigation.
Day 8-10: Alternate with mancozeb; sanitize tools.
Day 11-15: Final spray; balanced fertilizer. Long-term: Rotate 3 years, resistant seed.
`.trim(),

    'Tomato_Early_blight': `
Professional 15-Day Recovery Plan for Early Blight on Tomato:
Day 1-3: Remove lower infected leaves; apply chlorothalonil fungicide. Mulch; prune airflow.
Day 4-7: Reapply every 7-10 days; drip irrigation.
Day 8-10: Alternate azoxystrobin; space plants.
Day 11-15: Final application; harvest. Long-term: Rotate 2 years, tolerant varieties.
`.trim(),

    'Tomato_healthy': `
Maintenance Plan for Healthy Tomato:
Day 1-3: Stake/prune for airflow; balanced fertilizer.
Day 4-7: Drip water; mulch.
Day 8-10: Monitor pests; weed control.
Day 11-15: Harvest; rotate next season.
Long-term: Disease-free seed, sanitation.
`.trim(),

    'Tomato_Late_blight': `
Professional 15-Day Recovery Plan for Late Blight on Tomato:
Day 1-3: Destroy infected plants; apply chlorothalonil. Space for airflow; no overhead.
Day 4-7: Reapply every 5-7 days; destroy culls.
Day 8-10: Alternate mandipropamid; prune.
Day 11-15: Final spray; harvest dry. Long-term: Rotate 3 years, resistant varieties.
`.trim(),

    'Tomato_Leaf_Mold': `
Professional 15-Day Recovery Plan for Leaf Mold on Tomato:
Day 1-3: Remove infected leaves; apply copper fungicide. Ventilate; drip irrigation.
Day 4-7: Reapply copper; prune lower leaves.
Day 8-10: Improve airflow/fans; humidity <85%.
Day 11-15: Final application; balanced NPK. Long-term: Resistant varieties, sanitize.
`.trim(),

    'Septoria_leaf_spot': `
Professional 15-Day Recovery Plan for Septoria Leaf Spot on Tomato:
Day 1-3: Remove lower leaves; apply chlorothalonil. Mulch; no overhead.
Day 4-7: Reapply every 7 days; prune airflow.
Day 8-10: Alternate copper; rotate next season.
Day 11-15: Final spray; harvest. Long-term: 2-year rotation.
`.trim(),

    'Tomato_Spider_mites_Two_spotted_spider_mite': `
Professional 15-Day Recovery Plan for Two-Spotted Spider Mite on Tomato:
Day 1-3: Hose off mites; apply insecticidal soap or abamectin miticide to undersides. Increase humidity.
Day 4-7: Reapply soap every 3-5 days; release predatory mites if available.
Day 8-10: Monitor; avoid broad-spectrum insecticides.
Day 11-15: Final treatment; prune damaged leaves. Long-term: Weed control, avoid dust.
`.trim(),

    // Fallback for unknown or plantvillage
    'Unknown': `
Professional 15-Day Recovery Plan (General):
Day 1-3: Remove infected parts. Apply copper fungicide (1-2 tbsp/gallon). Prune airflow; mulch.
Day 4-7: Monitor; reapply every 7 days if wet. Drip irrigation.
Day 8-10: Alternate treatments; ventilate.
Day 11-15: Final application; fertilize. Long-term: Rotate crops.
`.trim(),
  };

  const recoveryPlan = recoveryPlans[diseaseClass] || info.treatment || `
Professional 15-Day Recovery Plan (General):
Day 1-3: Remove and destroy infected leaves/parts. Apply copper-based fungicide (e.g., Bordeaux mixture or fixed copper) or chlorothalonil/mancozeb per label (1-2 tbsp/gallon water). Spray thoroughly on foliage, wearing PPE. Prune for airflow; mulch to prevent splash.
Day 4-7: Monitor daily; reapply fungicide every 5-7 days in wet conditions. Avoid overhead watering; use drip irrigation.
Day 8-10: Alternate with mancozeb or sulfur if needed; improve ventilation.
Day 11-15: Final copper application; fertilize balanced NPK. Long-term: Rotate crops, plant resistant varieties.
`.trim();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.headerNav}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={COLORS.primaryDark} />
        </TouchableOpacity>
        <Text style={styles.title}>Diagnosis Result</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {imageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
          </View>
        )}
        <View style={styles.headerCard}>
          <Text style={styles.plant}>Plant Type: {plant}</Text>
          <Text style={styles.disease}>{diseaseName}</Text>
          <View style={styles.confidenceContainer}>
            <Text style={[styles.confidence, { color: confidenceColor }]}>
              Confidence: {confidenceLevel.toFixed(1)}%
            </Text>
            <View style={styles.confidenceBar}>
              <View style={[styles.confidenceFill, { width: `${confidenceLevel}%`, backgroundColor: confidenceColor }]} />
            </View>
          </View>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>About This Condition</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Treatment Steps</Text>
          <Text style={styles.text}>{recoveryPlan}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  scrollContent: {
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  headerCard: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  plant: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginBottom: 5,
  },
  disease: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.warning,
    marginBottom: 15,
    textAlign: 'center',
  },
  confidenceContainer: {
    width: '100%',
    alignItems: 'center',
  },
  confidence: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  confidenceBar: {
    height: 10,
    width: '90%',
    backgroundColor: COLORS.border,
    borderRadius: 5,
    overflow: 'hidden',
  },
  confidenceFill: {
    height: '100%',
    borderRadius: 5,
  },
  sectionCard: {
    marginBottom: 20,
    backgroundColor: COLORS.card,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: COLORS.primaryDark,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textPrimary,
  },
});