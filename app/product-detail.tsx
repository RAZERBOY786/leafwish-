import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// --- Updated Theme Colors ---
const COLORS = {
  primary: '#388E3C',
  primaryDark: '#1B5E20',
  white: '#FFFFFF',
  background: '#FBF8F5',
  card: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#6D4C41',
  border: '#E0E0E0',
};

const SIZES = {
  base: 12,
  radius: 20,
  padding: 24,
  h1: 28,
};

// ✅ Your Updated Plant Dataset
const plantData = [
  { 
    id: 'plant_1',
    name: 'Aloe Vera – Leaf Spot Disease',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE8x-T4QUY42XEZKZpdQnWVWdSvQBFcStM1A&s',
    types: 'Succulent',
    description: 'Aloe Vera commonly suffers from leaf spot disease caused by bacteria or fungi, leading to brown circular spots on leaves.'
  },
  { 
    id: 'plant_2',
    name: 'Basil – Downy Mildew',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5R-RiQUrpd_p7L9abn7VPlRKi4r5FXyq-LA&s',
    types: 'Herb',
    description: 'Basil Downy Mildew appears as yellowing leaves with gray or purple fungal growth under the leaf surface.'
  },
  { 
    id: 'plant_3',
    name: 'Lavender – Root Rot',
    image: 'https://compassgm.co.uk/wp-content/uploads/2024/08/soil-ph-2.jpg',
    types: 'Flowering',
    description: 'Lavender root rot is caused by overwatering and poor drainage, leading to black roots and wilting stems.'
  },
  { 
    id: 'plant_4',
    name: 'Mint – Rust Disease',
    image: 'https://worldofplants.ai/wp-content/uploads/2024/05/word-image-84016-3.jpeg',
    types: 'Herb',
    description: 'Mint rust disease causes orange or brown pustules under the leaves, resulting in leaf drop and stunted growth.'
  },
  { 
    id: 'plant_5',
    name: 'Rose – Black Spot Disease',
    image: 'https://www.thespruce.com/thmb/ywjZ0Qg5p2rIKC--mgr4Mccbkec=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/BlackSpot_onRose-56f18bb03df78ce5f83c10e0.jpg',
    types: 'Flowering',
    description: 'Black Spot is a common fungal disease in roses causing black dots on leaves, yellowing, and leaf drop.'
  },
  { 
    id: 'plant_6',
    name: 'Cactus – Soft Rot',
    image: 'https://www.plantdiseases.org/sites/default/files/plant_disease/images/0193.jpg',
    types: 'Succulent',
    description: 'Cactus soft rot occurs due to bacterial infection, making the cactus mushy, dark, and foul-smelling.'
  },
  { 
    id: 'plant_7',
    name: 'Thyme – Root Rot',
    image: 'https://s3-us-west-1.amazonaws.com/sg-production-public/data/images/834/files/big_rootrot.jpg',
    types: 'Herb',
    description: 'Thyme root rot happens from excess watering, causing wilted leaves and blackened root systems.'
  },
  { 
    id: 'plant_8',
    name: 'Sunflower – Downy Mildew',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Q_873oYHSgJAb8DRE_gphC5y9pTXbAaIgA&s',
    types: 'Flowering',
    description: 'Sunflower Downy Mildew leads to pale leaves, white fungal growth, and stunted plant development.'
  },
  { 
    id: 'plant_9',
    name: 'Fern – Leaf Blight',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpdTrzdtZPkp7uO9naYJJmPFSpZphZHSm6qQ&s',
    types: 'Leafy Green',
    description: 'Fern leaf blight causes brown patches along leaf edges and yellowing fronds due to fungal infections.'
  },
  { 
    id: 'plant_10',
    name: 'Rosemary – Powdery Mildew',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlocBLS12TJXXv3HZB2eVXnngmeiavnYAanw&s',
    types: 'Herb',
    description: 'Rosemary powdery mildew appears as white powdery fungus on leaves, reducing growth and aroma.'
  },
  { 
    id: 'plant_11',
    name: 'Orchid – Leaf Spot (Bacterial)',
    image: 'https://staugorchidsociety.org/picts/problem/pseudomonas/F19.jpg',
    types: 'Flowering',
    description: 'Orchids often develop bacterial leaf spot causing water-soaked lesions that turn black.'
  },
  { 
    id: 'plant_12',
    name: 'Spider Plant – Tip Burn',
    image: 'https://www.littleflowercottage.com/wp-content/uploads/2024/09/spider-plant-with-brown-tips.jpg',
    types: 'Leafy Green',
    description: 'Spider plant tip burn results from mineral buildup, causing leaf ends to turn brown and dry.'
  },
  { 
    id: 'plant_13',
    name: 'Chamomile – Powdery Mildew',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReIAbtZfuX6hw6b2dIg2x4dOlJxQY_QFdprw&s',
    types: 'Herb',
    description: 'Chamomile powdery mildew forms a white, powder-like coating on leaves, stunting flower production.'
  },
  { 
    id: 'plant_14',
    name: 'Jade Plant – Mealybug Infestation',
    image: 'https://somethingscrawlinginmyhair.com/wp-content/uploads/2022/03/Mealybug_cotton.jpg',
    types: 'Succulent',
    description: 'Jade plants get mealybugs that appear as cotton-like clusters sucking plant juices.'
  },
  { 
    id: 'plant_15',
    name: 'Tulip – Botrytis Blight',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4OncqTWmei2UrBaREkS9g5H7znSie2b_ENA&s',
    types: 'Flowering',
    description: 'Botrytis blight causes brown spots, dry petals, and fuzzy mold patches on tulip leaves.'
  },
  { 
    id: 'plant_16',
    name: 'Sage – Powdery Mildew',
    image: 'https://worldofplants.ai/wp-content/uploads/2024/05/word-image-83988-2.jpeg',
    types: 'Herb',
    description: 'Sage powdery mildew leads to white fungal patches on leaves and reduced aroma intensity.'
  },
  { 
    id: 'plant_17',
    name: 'Pothos – Bacterial Leaf Spot',
    image: 'https://thumbs.dreamstime.com/b/leaves-golden-pothos-houseplant-unknown-leaf-spot-disease-shape-small-black-stripes-caused-fungus-bacteria-196017334.jpg',
    types: 'Leafy Green',
    description: 'Pothos leaf spot forms dark, water-soaked lesions that spread rapidly in humid conditions.'
  },
  { 
    id: 'plant_18',
    name: 'Daisy – Powdery Mildew',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIKanAMrLsURxcRNXbjQSoZZgV66BJqL9ETg&s',
    types: 'Flowering',
    description: 'Daisies often get powdery mildew showing as white patches on leaves and stems.'
  },
  { 
    id: 'plant_19',
    name: 'Eucalyptus – Leaf Blight',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5wOgWr_MFoIR4vYRM2JOZrmQisfMvKygJOQ&s',
    types: 'Leafy Green',
    description: 'Eucalyptus leaf blight causes brown edges, leaf fall, and weakened branches due to fungal attack.'
  },
  { 
    id: 'plant_20',
    name: 'Marigold – Alternaria Leaf Spot',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMcSG3Otvz6AG0FG8Qreo2csRP0yGzFooIkA&s',
    types: 'Flowering',
    description: 'Marigold leaf spot develops as round brown spots with yellow halos, spread by high humidity.'
  }
];


// Dummy medicine data (fixed)
const medicineData = [
  { id: 'medicine_1', name: 'Neem Oil', image: 'https://m.media-amazon.com/images/I/71aguzjMY+L._AC_UF1000,1000_QL80_.jpg', types: 'Organic Pesticide', description: 'Neem oil is a natural, versatile pesticide derived from the seeds of the neem tree. It acts as both an insecticide and fungicide, effectively controlling a wide range of pests including aphids, mites, whiteflies, caterpillars, and fungal diseases like powdery mildew, black spot, rust, and anthracnose. Its active compound, azadirachtin, disrupts insect feeding, growth, and reproduction while repelling many pests. Safe for beneficial insects when used properly, neem oil is biodegradable, non-toxic to mammals and birds, and approved for organic farming. It can be applied as a foliar spray on vegetables, fruits, ornamentals, and indoor plants, providing preventive and curative protection with minimal environmental impact. Regular applications help maintain healthy plants without building pest resistance.' },

  { id: 'medicine_2', name: 'Copper Oxychloride', image: 'https://static.wixstatic.com/media/5fa56a_52c1c63e569f45eb95ac8b2667993eb4~mv2.jpg/v1/fill/w_560,h_560,al_c,lg_1,q_90,enc_avif,quality_auto/DART%20SELECTIVE%20LAWN%20HERBICIDE%20CLUSTER.jpg', types: 'Fungicide', description: 'Effective against leaf spots, blight, and bacterial infections.' },
 
  { id: 'medicine_3', name: 'Mancozeb', image: 'https://agriplexindia.com/cdn/shop/files/NewProject_67.jpg?v=1743242093', types: 'Fungicide', description: 'Mancozeb is a broad-spectrum contact fungicide belonging to the dithiocarbamate group, widely used for preventive control of numerous fungal diseases in fruits, vegetables, nuts, and field crops. It protects against early and late blight, downy mildew, leaf spots, rust, scab, and anthracnose by interfering with multiple fungal enzymes, offering low resistance risk due to its multi-site action. Commonly applied to potatoes, tomatoes, grapes, onions, and cucurbits, it ensures comprehensive protection when used before disease onset. Compatible with many other fungicides, mancozeb enhances integrated disease management, promotes crop safety, and supports higher yields with minimal environmental persistence.' },

  { id: 'medicine_4', name: 'Imidacloprid', image: 'https://dujjhct8zer0r.cloudfront.net/media/prod_image/6760539171743595119.webp', types: 'Insecticide', description: 'Imidacloprid is a systemic neonicotinoid insecticide highly effective against sucking pests such as aphids, whiteflies, leafhoppers, thrips, and certain beetles. It acts on the insect nervous system, causing paralysis and death, and provides long-lasting protection through soil, seed, or foliar applications. Widely used on vegetables, fruits, cotton, cereals, and ornamentals, it offers rapid knockdown and residual control while being selective toward beneficial insects in some cases. Its systemic nature ensures thorough plant protection, making it a key tool in integrated pest management for sustainable agriculture with low mammalian toxicity.' },

  { id: 'medicine_5', name: 'Chlorpyrifos', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5B3dE_QXDg7hRr08qLvBYhAolcMG55TviSQ&s', types: 'Insecticide', description: 'Chlorpyrifos is a broad-spectrum organophosphate insecticide effective against foliage and soil-borne pests, including termites, cutworms, rootworms, beetles, and mosquitoes. It disrupts insect nervous systems, providing contact, stomach, and vapor action for comprehensive control on crops like soybeans, corn, alfalfa, fruits, and vegetables. Known for its versatility in agricultural and structural pest management, it offers residual protection but requires careful application due to potential environmental and health concerns. Widely used globally, it supports high-yield farming by targeting a diverse range of damaging insects.' },

  { id: 'medicine_6', name: 'Carbendazim', image: 'https://5.imimg.com/data5/SX/VV/DQ/SELLER-49180782/ju-carbendazim-fungicide-500x500.png', types: 'Fungicide', description: 'Carbendazim is a systemic benzimidazole fungicide with broad-spectrum activity against fungal diseases like powdery mildew, blight, wilt, root rot, and leaf spots caused by pathogens such as Fusarium, Alternaria, and Botrytis. Absorbed by plants and translocated internally, it provides long-lasting preventive and curative protection for cereals, fruits, vegetables, and ornamentals. Its ability to inhibit fungal cell division makes it effective in integrated disease management, promoting healthier crops and higher yields with low risk of phytotoxicity when used correctly.' },

  { id: 'medicine_7', name: 'Bordeaux Mixture', image: 'https://www.katyayaniorganics.com/wp-content/uploads/2023/10/Disease-Collection-Images-16_11zon.webp', types: 'Fungicide', description: 'Bordeaux mixture is a traditional copper-based fungicide and bactericide made from copper sulfate and lime, renowned for controlling downy mildew, powdery mildew, blights, leaf spots, anthracnose, and bacterial diseases in grapes, fruits, vegetables, and potatoes. It forms a protective barrier on plant surfaces, preventing spore germination and offering rain-resistant, long-lasting protection. Approved for organic farming, it is safe, effective, and resistant to fungal resistance development, making it ideal for sustainable agriculture in humid conditions.' },

  { id: 'medicine_8', name: 'Sulfur Dust', image: 'https://www.shutterstock.com/image-photo/sulfur-powder-on-white-background-260nw-1365983942.jpg', types: 'Fungicide', description: 'Sulfur dust is an organic fungicide and miticide effective against powdery mildew, rust, leaf spots, scab, and mites on fruits, vegetables, berries, roses, and ornamentals. It works by disrupting fungal spores and pest respiration, providing preventive and curative control. Safe for organic gardening and usable up to harvest day, it offers broad-spectrum protection with low toxicity to beneficial insects when applied correctly, making it a reliable choice for sustainable disease and pest management.' },

  { id: 'medicine_9', name: 'Spinosad', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXIAMtM6_0z08eq_LLq1eG-GQkZsqd50PNmg&s', types: 'Organic Insecticide', description: 'Spinosad is a natural, organic insecticide derived from soil bacteria, highly effective against caterpillars, thrips, leafminers, beetles, and flies on vegetables, fruits, ornamentals, and turf. It acts as a nerve and stomach poison, providing rapid knockdown and residual control while being safe for many beneficial insects. Approved for organic farming, it offers broad-spectrum pest management with low mammalian toxicity and environmental persistence, ideal for integrated pest management programs.' },

  { id: 'medicine_10', name: 'Potassium Bicarbonate', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRCyOv9dI34ozez_YqLzJIcEbgmAP7b89MdQ&s', types: 'Organic Fungicide', description: 'Potassium bicarbonate is an organic fungicide effective against powdery mildew, downy mildew, leaf spots, and anthracnose on fruits, vegetables, and ornamentals. It alters pH on leaf surfaces, disrupting fungal growth, and provides preventive and curative action. Safe for edible crops and beneficial insects, it leaves no harmful residues, enhances plant health by supplying potassium, and is ideal for organic farming in humid conditions.' },

  { id: 'medicine_11', name: 'Captan', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQu2KiBs3mMVOvso19CqFNq740_HucqPnvHTg&s', types: 'Fungicide', description: 'Captan is a broad-spectrum fungicide used to control damping-off, root rot, leaf spots, blights, scab, and fruit rots on fruits, vegetables, and ornamentals. It provides protective action by inhibiting fungal spore germination, ensuring safe use on edible crops with minimal resistance risk. Versatile for preventive applications, it supports healthy plant growth in diverse agricultural settings.' },

  { id: 'medicine_12', name: 'Tebuconazole', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUlgjeg7-M6NSBQELAjRciuxH5_PpYcMSbZg&s', types: 'Systemic Fungicide', description: 'Tebuconazole is a systemic triazole fungicide with protective, curative, and eradicant action against rust, powdery mildew, blight, leaf spots, and anthracnose in cereals, fruits, vegetables, and nuts. It inhibits fungal ergosterol biosynthesis, providing long-lasting control and resistance management benefits when rotated with other fungicides.' },

  { id: 'medicine_13', name: 'Acetamiprid', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjIDEmC6dpwhGJU_o9y-WmUODod-StVKr6Bg&s', types: 'Insecticide', description: 'Acetamiprid is a neonicotinoid insecticide effective against sucking pests like aphids, whiteflies, thrips, and leafhoppers on vegetables, fruits, cotton, and ornamentals. Systemic and contact action provides rapid, long-lasting control with low toxicity to mammals, supporting integrated pest management.' },

  { id: 'medicine_14', name: 'Trichoderma Viride', image: 'https://m.media-amazon.com/images/I/61kA8t-efbL.jpg', types: 'Bio-Fungicide', description: 'Trichoderma viride is a beneficial fungus used as a bio-fungicide to control soil-borne diseases like root rot, wilt, damping-off, and collar rot caused by Fusarium, Rhizoctonia, and Pythium in vegetables, fruits, and plantations. It antagonizes pathogens through competition, mycoparasitism, and enzyme production while promoting plant growth and resistance. Eco-friendly and organic-approved, it enhances soil health and crop yields sustainably.' },

  { id: 'medicine_15', name: 'Beauveria Bassiana', image: 'https://m.media-amazon.com/images/I/51ROGgg5wrL.jpg', types: 'Bio-Insecticide', description: 'Beauveria bassiana is an entomopathogenic fungus used as a bio-insecticide against whiteflies, aphids, thrips, beetles, and caterpillars on crops and ornamentals. It infects insects on contact, causing white muscardine disease, and is safe for beneficial insects and the environment. Organic-approved, it provides effective, sustainable pest control.' },

  { id: 'medicine_16', name: 'Metarhizium Anisopliae', image: 'https://m.media-amazon.com/images/I/71M9f7HdJ+L.jpg', types: 'Bio-Insecticide', description: 'Metarhizium anisopliae is a bio-insecticide fungus targeting soil pests like termites, grubs, root weevils, cutworms, and borers in vegetables, fruits, and field crops. It infects insects through contact, leading to death and spore production for continued control. Eco-friendly and organic-compatible, it supports sustainable pest management.' },

  { id: 'medicine_17', name: 'Hexaconazole', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6FbcYMYUo3N14VQ4Mkk-z70pwDoe_dRk15g&s', types: 'Fungicide', description: 'Hexaconazole is a systemic triazole fungicide controlling powdery mildew, rust, sheath blight, leaf spots, and scab in rice, fruits, vegetables, and cereals. It offers protective, curative, and eradicant action with translaminar movement for thorough coverage and long-lasting disease prevention.' },

  { id: 'medicine_18', name: 'Validamycin', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3BipMezI5XJZJD62Rubz9881ig09jI9aeZg&s', types: 'Antibiotic Fungicide', description: 'Validamycin is an antibiotic fungicide specifically effective against sheath blight (Rhizoctonia solani) in rice and other soil-borne diseases. It inhibits fungal hyphal growth through contact action, providing safe, non-systemic control with low environmental impact.' },

  { id: 'medicine_19', name: 'Azadirachtin', image: 'https://www.greenvisionindia.com/wp-content/uploads/2022/09/Azaneem-10000.png', types: 'Botanical Pesticide', description: 'Azadirachtin, extracted from neem seeds, is a botanical insecticide disrupting insect feeding, growth, molting, and reproduction. Effective against chewing and sucking pests like caterpillars, aphids, and whiteflies on various crops, it is organic-approved, safe for beneficials, and environmentally friendly.' },

  { id: 'medicine_20', name: 'Thiamethoxam', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSplhbeC3P7xbW3KfIIAY_AfBp6HXwzNTH_tA&s', types: 'Insecticide', description: 'Thiamethoxam is a systemic neonicotinoid insecticide controlling sucking and soil pests like aphids, whiteflies, and termites in vegetables, fruits, and cereals. It provides rapid, long-lasting protection with selective toxicity, enhancing crop health and yield in integrated pest management.' },
];



// Bottom Navigation UI
const BottomNav = () => {
  const router = useRouter();
  return (
    <View style={styles.bottomNavContainer}>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('./home')}>
        <Ionicons name="home" size={28} color={COLORS.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('./cam')}>
        <Ionicons name="scan-circle" size={36} color={COLORS.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={() => router.push('./settings')}>
        <MaterialIcons name="settings" size={28} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default function ProductDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const category = params.category as 'plant' | 'medicine';
  const id = params.id as string;

  if (!category || !id) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Invalid parameters provided</Text>
      </SafeAreaView>
    );
  }

  const data = category === 'plant' ? plantData : medicineData;
  const item = data.find((it) => it.id === id);

  if (!item) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Item not found</Text>
      </SafeAreaView>
    );
  }

  const relatedItems = data.filter((it) => it.id !== id).slice(0, 10);

  const renderRelatedItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.relatedItemContainer}
      onPress={() =>
        router.push({
          pathname: './product-detail',
          params: {
            id: item.id,
            category,
            name: item.name,
            image: item.image,
            types: item.types,
            description: item.description,
          },
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.relatedItemImage} />
      <View style={styles.relatedItemInfo}>
        <Text style={styles.relatedItemText}>{item.name}</Text>
        <Text style={styles.relatedItemType}>{item.types}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Image source={{ uri: item.image }} style={styles.mainImage} />
              <View style={styles.titleContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.typeBadge}>
                  <Text style={styles.typeBadgeText}>{item.types}</Text>
                </View>
              </View>
            </View>
            <View style={styles.detailsCard}>
              <Text style={styles.sectionTitle}>Details</Text>
              <Text style={styles.detailText}>{item.description}</Text>
            </View>
            <Text style={styles.relatedTitle}>
              Related {category === 'plant' ? 'Plants' : 'Medicines'}
            </Text>
          </>
        }
        data={relatedItems}
        renderItem={renderRelatedItem}
        keyExtractor={(it) => it.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      <BottomNav />
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: SIZES.padding / 2,
    paddingTop: SIZES.base,
  },
  mainImage: {
    width: '100%',
    height: 350,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  titleContainer: {
    paddingHorizontal: SIZES.padding / 2,
    marginBottom: SIZES.padding,
  },
  itemName: {
    fontSize: SIZES.h1,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SIZES.base,
  },
  typeBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  typeBadgeText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  detailsCard: {
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primaryDark,
    marginBottom: SIZES.base,
  },
  detailText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  relatedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.base,
  },
  relatedItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: SIZES.radius,
    padding: SIZES.base,
    marginBottom: SIZES.base,
    marginHorizontal: SIZES.padding,
    elevation: 4,
  },
  relatedItemImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radius - 5,
    resizeMode: 'cover',
    marginRight: SIZES.base,
  },
  relatedItemInfo: {
    flex: 1,
  },
  relatedItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  relatedItemType: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 80,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: SIZES.base,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingBottom: Platform.OS === 'ios' ? SIZES.padding : SIZES.base,
  },
  navButton: {
    padding: 10,
  },
});
