import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Card, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const colors = {
  primary: "#6A1B9A",
  secondary: "#1976D2",
  accent: "#8E24AA",
  background: "#F3E5F5",
  cardBackground: "#FFFFFF",
  text: "#333",
  lightText: "#555",
  placeholder: "#888",
  buttonText: "#FFFFFF",
};

// ================== Login Screen ==================
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dummyUser = {
    email: "javeria@skillswap.com",
    password: "8593",
  };

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !password.trim()) {
      setError("Email and password fields cannot be empty.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters long.");
      return;
    }
    if (email === dummyUser.email && password === dummyUser.password) {
      setError("");
      navigation.replace("MainTabs");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>SkillSwap</Text>
      <Text style={styles.subtitle}>Login to continue</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.lightText}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.lightText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don’t have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

// ================== Signup Screen ==================
function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name.trim()) {
      setError("Full name cannot be empty.");
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError("Email and password fields cannot be empty.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");
    alert("Account created successfully! Please log in.");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>SkillSwap</Text>
      <Text style={styles.subtitle}>Create an account</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor={colors.lightText}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.lightText}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.lightText}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

// ================== Skills List ==================
function SkillSwapScreen() {
  const [searchText, setSearchText] = useState("");
  const skillsData = [
    { skill: "Web Development", user: "Ali Khan", rating: 4 },
    { skill: "Graphic Design", user: "Sara Ahmed", rating: 5 },
    { skill: "Photography", user: "Ahmed Raza", rating: 3 },
    { skill: "Mobile App Development", user: "Javeria Khan", rating: 5 },
    { skill: "Video Editing", user: "Umar Farooq", rating: 4 },
    { skill: "Content Writing", user: "Zainab Ali", rating: 2 },
    { skill: "Digital Marketing", user: "Aisha Malik", rating: 5 },
    { skill: "UI/UX Design", user: "Faisal Latif", rating: 4 },
  ];

  const filteredSkills = skillsData.filter((item) =>
    item.skill.toLowerCase().includes(searchText.toLowerCase()) ||
    item.user.toLowerCase().includes(searchText.toLowerCase())
  );
  
  // A new component for displaying stars on the home screen
  const RatingStars = ({ rating }) => {
    const stars = [1, 2, 3, 4, 5];
    return (
      <View style={homeStyles.starsContainer}>
        {stars.map((star) => (
          <Icon
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={18}
            color="#FFC107"
            style={homeStyles.starIcon}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for skills..."
        placeholderTextColor={colors.lightText}
        value={searchText}
        onChangeText={setSearchText}
      />
      <Text style={styles.title}>Available Skills</Text>
      {filteredSkills.map((item, index) => (
        <Card key={index} style={styles.card}>
          <Card.Content>
            <Text style={styles.cardTitle}>{item.skill}</Text>
            <View style={homeStyles.userRatingContainer}>
                <Text style={styles.cardSubtitle}>Offered by {item.user}</Text>
                <RatingStars rating={item.rating} />
            </View>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>Request Swap</Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

// ================== My Swaps Screens ==================
const pendingSwaps = [
  { id: "1", offered: "website", offeredBy: "test", requested: "logo design", requestedBy: "Godlove Kuate", status: "Pending", created: "Aug 1, 2025" },
  { id: "2", offered: "website", offeredBy: "test", requested: "cooking", requestedBy: "mwanja Solomon", status: "Pending", created: "Aug 1, 2025" },
  { id: "3", offered: "website", offeredBy: "test", requested: "guitar", requestedBy: "pawan", status: "Pending", created: "Aug 1, 2025" },
];
const activeSwaps = [
  { id: "4", offered: "Graphic Design", offeredBy: "Sara Ahmed", requested: "Web Development", requestedBy: "John Doe", status: "Active", created: "Sep 15, 2025" },
];
const completedSwaps = [
  { id: "5", offered: "Photography", offeredBy: "Ahmed Raza", requested: "Video Editing", requestedBy: "John Doe", status: "Completed", created: "Aug 20, 2025" },
];
const renderSwapCard = (swap) => (
  <Card key={swap.id} style={styles.swapCard}>
    <View style={styles.swapDetails}>
      <Text style={styles.swapLabel}>You offered:</Text>
      <Text style={styles.swapSkill}>{swap.offered}</Text>
      <Text style={styles.swapUser}>by {swap.offeredBy}</Text>
    </View>
    <View style={styles.swapIconContainer}>
      <Icon name="swap-horizontal" size={24} color={colors.primary} />
    </View>
    <View style={styles.swapDetails}>
      <Text style={styles.swapLabel}>You get:</Text>
      <Text style={styles.swapSkill}>{swap.requested}</Text>
      <Text style={styles.swapUser}>by {swap.requestedBy}</Text>
    </View>
    <View style={[styles.statusBadge, { backgroundColor: colors.accent }]}>
      <Text style={styles.statusText}>{swap.status}</Text>
    </View>
  </Card>
);
function PendingSwapsScreen() {
  return (
    <ScrollView style={styles.container}>
      {pendingSwaps.map(renderSwapCard)}
      <TouchableOpacity style={styles.fabInline}>
        <Icon name="add" size={30} color={colors.buttonText} />
      </TouchableOpacity>
    </ScrollView>
  );
}
function ActiveSwapsScreen() {
  return (
    <ScrollView style={styles.container}>
      {activeSwaps.map(renderSwapCard)}
      <TouchableOpacity style={styles.fabInline}>
        <Icon name="add" size={30} color={colors.buttonText} />
      </TouchableOpacity>
    </ScrollView>
  );
}
function CompletedSwapsScreen() {
  return (
    <ScrollView style={styles.container}>
      {completedSwaps.map(renderSwapCard)}
      <TouchableOpacity style={styles.fabInline}>
        <Icon name="add" size={30} color={colors.buttonText} />
      </TouchableOpacity>
    </ScrollView>
  );
}
const SwapsStack = createNativeStackNavigator();
function MySwapsScreen() {
  return (
    <SwapsStack.Navigator screenOptions={{ headerShown: false }}>
      <SwapsStack.Screen name="SwapsHome" component={SwapsTabs} />
    </SwapsStack.Navigator>
  );
}
const SwapsTab = createBottomTabNavigator();
function SwapsTabs() {
  return (
    <SwapsTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightText,
        tabBarStyle: { display: "none" },
      })}
      initialRouteName="Pending"
    >
      <SwapsTab.Screen name="Pending" component={PendingSwapsScreen} />
      <SwapsTab.Screen name="Active" component={ActiveSwapsScreen} />
      <SwapsTab.Screen name="Completed" component={CompletedSwapsScreen} />
    </SwapsTab.Navigator>
  );
}
function MySwapsScreenWrapper() {
  const [activeTab, setActiveTab] = useState("Pending");
  const renderScreen = () => {
    switch (activeTab) {
      case "Pending": return <PendingSwapsScreen />;
      case "Active": return <ActiveSwapsScreen />;
      case "Completed": return <CompletedSwapsScreen />;
      default: return null;
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.headerButtons}>
        <TouchableOpacity
          style={ activeTab === "Pending" ? styles.headerButtonActive : styles.headerButton }
          onPress={() => setActiveTab("Pending")}
        >
          <Text style={ activeTab === "Pending" ? styles.headerButtonTextActive : styles.headerButtonText }> Pending </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ activeTab === "Active" ? styles.headerButtonActive : styles.headerButton }
          onPress={() => setActiveTab("Active")}
        >
          <Text style={ activeTab === "Active" ? styles.headerButtonTextActive : styles.headerButtonText }> Active </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={ activeTab === "Completed" ? styles.headerButtonActive : styles.headerButton }
          onPress={() => setActiveTab("Completed")}
        >
          <Text style={ activeTab === "Completed" ? styles.headerButtonTextActive : styles.headerButtonText }> Completed </Text>
        </TouchableOpacity>
      </View>
      {renderScreen()}
    </View>
  );
}

// ================== Conversations Screen ==================
function ConversationsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.emptyContainer}>
        <Icon name="chatbubbles-outline" size={80} color={colors.lightText} />
        <Text style={styles.emptyTitle}>No conversations yet</Text>
        <Text style={styles.emptySubtitle}>
          Start a conversation by tapping the button below
        </Text>
      </View>
      <TouchableOpacity style={styles.fab}>
        <Icon name="create-outline" size={30} color={colors.buttonText} />
      </TouchableOpacity>
    </View>
  );
}

// ================== Profile Screen (Effective) ==================

const SkillTag = ({ text, onRemove }) => (
  <View style={profileStyles.skillTag}>
    <Text style={profileStyles.skillTagText}>{text}</Text>
    {onRemove && (
      <TouchableOpacity onPress={onRemove} style={profileStyles.removeSkillButton}>
        <Icon name="close-circle" size={16} color="#B71C1C" />
      </TouchableOpacity>
    )}
  </View>
);

const RatingStars = ({ rating, onRate }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <View style={profileStyles.starsContainer}>
      {stars.map((star) => (
        <TouchableOpacity key={star} onPress={() => onRate(star)}>
          <Icon
            name={star <= rating ? "star" : "star-outline"}
            size={24}
            color="#FFC107"
            style={profileStyles.starIcon}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};


function ProfileScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Javeria Hussain",
    title: "UX/UI Designer",
    bio: "Passionate about creating intuitive user experiences and beautiful interfaces. Always looking to collaborate on new and exciting projects.",
    offeredSkills: ["UI/UX Design", "Figma", "Wireframing"],
    wantedSkills: ["Python", "Photography"],
    image: "https://img.freepik.com/free-vector/cute-girl-hacker-operating-laptop-cartoon-vector-icon-illustration-people-technology-isolated-flat_138676-9487.jpg?w=740&q=80",
    rating: 4, // Add a rating state
  });
  const [newOfferedSkill, setNewOfferedSkill] = useState('');
  const [newWantedSkill, setNewWantedSkill] = useState('');

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfile({ ...profile, image: result.assets[0].uri });
    }
  };

  const handleAddSkill = (type) => {
    const skillToAdd = type === 'offered' ? newOfferedSkill.trim() : newWantedSkill.trim();
    if (!skillToAdd) return;
    
    if (type === 'offered') {
      setProfile({ ...profile, offeredSkills: [...profile.offeredSkills, skillToAdd] });
      setNewOfferedSkill('');
    } else {
      setProfile({ ...profile, wantedSkills: [...profile.wantedSkills, skillToAdd] });
      setNewWantedSkill('');
    }
  };

  const handleRemoveSkill = (type, skillToRemove) => {
    if (type === 'offered') {
      setProfile({ ...profile, offeredSkills: profile.offeredSkills.filter(skill => skill !== skillToRemove) });
    } else {
      setProfile({ ...profile, wantedSkills: profile.wantedSkills.filter(skill => skill !== skillToRemove) });
    }
  };
  
  const handleRate = (newRating) => {
    setProfile({ ...profile, rating: newRating });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile Updated Successfully!");
  };

  const handleLogout = () => {
    navigation.replace("Login");
  };

  return (
    <ScrollView style={profileStyles.container}>
      <TouchableOpacity
        style={profileStyles.editToggleBtn}
        onPress={() => isEditing ? handleSave() : setIsEditing(true)}
      >
        <Text style={profileStyles.editToggleBtnText}>
          {isEditing ? "Save" : "Edit"}
        </Text>
      </TouchableOpacity>

      <View style={profileStyles.header}>
        <View style={profileStyles.profileImageContainer}>
          <Image source={{ uri: profile.image }} style={profileStyles.profileImage} />
          {isEditing && (
            <TouchableOpacity style={profileStyles.editImageButton} onPress={pickImage}>
              <MaterialIcons name="camera-alt" size={24} color={colors.buttonText} />
            </TouchableOpacity>
          )}
        </View>

        {isEditing ? (
          <>
            <TextInput
              style={profileStyles.profileNameInput}
              value={profile.name}
              onChangeText={(text) => setProfile({ ...profile, name: text })}
              placeholder="Your Name"
            />
            <TextInput
              style={profileStyles.profileTitleInput}
              value={profile.title}
              onChangeText={(text) => setProfile({ ...profile, title: text })}
              placeholder="Your Title"
            />
          </>
        ) : (
          <>
            <Text style={profileStyles.profileName}>{profile.name}</Text>
            <Text style={profileStyles.profileTitle}>{profile.title}</Text>
          </>
        )}
        <RatingStars rating={profile.rating} onRate={handleRate} />
      </View>

      <View style={profileStyles.card}>
        <Text style={profileStyles.sectionTitle}>About Me</Text>
        {isEditing ? (
          <TextInput
            style={profileStyles.bioInput}
            multiline
            value={profile.bio}
            onChangeText={(text) => setProfile({ ...profile, bio: text })}
            placeholder="Tell us about yourself..."
          />
        ) : (
          <Text style={profileStyles.bioText}>{profile.bio}</Text>
        )}
      </View>

      <View style={profileStyles.card}>
        <Text style={profileStyles.sectionTitle}>Skills I Offer</Text>
        <View style={profileStyles.skillsContainer}>
          {profile.offeredSkills.map((skill, index) => (
            <SkillTag
              key={index}
              text={skill}
              onRemove={isEditing ? () => handleRemoveSkill('offered', skill) : null}
            />
          ))}
        </View>
        {isEditing && (
          <View style={profileStyles.skillInputContainer}>
            <TextInput
              style={profileStyles.skillInput}
              placeholder="Add new skill..."
              value={newOfferedSkill}
              onChangeText={setNewOfferedSkill}
            />
            <TouchableOpacity onPress={() => handleAddSkill('offered')} style={profileStyles.addSkillButton}>
              <Text style={profileStyles.addSkillButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={profileStyles.card}>
        <Text style={profileStyles.sectionTitle}>Skills I Want to Learn</Text>
        <View style={profileStyles.skillsContainer}>
          {profile.wantedSkills.map((skill, index) => (
            <SkillTag
              key={index}
              text={skill}
              onRemove={isEditing ? () => handleRemoveSkill('wanted', skill) : null}
            />
          ))}
        </View>
        {isEditing && (
          <View style={profileStyles.skillInputContainer}>
            <TextInput
              style={profileStyles.skillInput}
              placeholder="Add new skill..."
              value={newWantedSkill}
              onChangeText={setNewWantedSkill}
            />
            <TouchableOpacity onPress={() => handleAddSkill('wanted')} style={profileStyles.addSkillButton}>
              <Text style={profileStyles.addSkillButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <TouchableOpacity style={profileStyles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color={colors.lightText} />
        <Text style={profileStyles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ================== Bottom Tabs ==================
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lightText,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Swaps") {
            iconName = "swap-horizontal-outline";
          } else if (route.name === "Conversations") {
            iconName = "chatbubbles-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={SkillSwapScreen} />
      <Tab.Screen name="Swaps" component={MySwapsScreenWrapper} />
      <Tab.Screen name="Conversations" component={ConversationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// ================== App Entry ==================
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ================== Styles ==================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  authContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.lightText,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.cardBackground,
    fontSize: 16,
    width: "100%",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
    backgroundColor: colors.cardBackground,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 12,
    width: "100%",
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: colors.primary,
    textAlign: "center",
    marginTop: 10,
  },
  card: {
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.lightText,
    marginVertical: 6,
  },
  smallButton: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  smallButtonText: {
    color: colors.buttonText,
    fontSize: 14,
  },
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: colors.placeholder,
    height: 60,
    paddingBottom: 6,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  headerButtonActive: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  headerButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.text,
  },
  headerButtonTextActive: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.buttonText,
  },
  swapCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  swapDetails: {
    flex: 1,
  },
  swapLabel: {
    fontSize: 12,
    color: colors.lightText,
  },
  swapSkill: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 4,
  },
  swapUser: {
    fontSize: 14,
    color: colors.lightText,
    marginTop: 2,
  },
  swapIconContainer: {
    marginHorizontal: 12,
  },
  statusBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  fabInline: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    padding: 16,
    elevation: 5,
    alignSelf: "center",
    marginVertical: 20,
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    padding: 16,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.text,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.lightText,
    textAlign: "center",
    marginTop: 5,
  },
  logoutButton: {
    marginTop: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

const homeStyles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  starIcon: {
    marginHorizontal: 1,
  },
  userRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
});

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  editToggleBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 5,
  },
  editToggleBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 20,
    backgroundColor: colors.cardBackground,
  },
  profileImageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  editImageButton: {
    position: "absolute",
    right: -20,
    bottom: 0,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
    elevation: 5,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginTop: 5,
  },
  profileTitle: {
    fontSize: 16,
    color: colors.lightText,
  },
  profileNameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: colors.placeholder,
    width: '80%',
  },
  profileTitleInput: {
    fontSize: 16,
    color: colors.lightText,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: colors.placeholder,
    width: '80%',
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 10,
  },
  bioText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  bioInput: {
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  skillTag: {
    backgroundColor: "#E1BEE7",
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillTagText: {
    color: colors.primary,
    fontWeight: "bold",
  },
  removeSkillButton: {
    marginLeft: 5,
    padding: 2,
  },
  skillInputContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  skillInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.placeholder,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  addSkillButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
  },
  addSkillButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 18,
    color: colors.lightText,
    marginLeft: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  starIcon: {
    marginHorizontal: 2,
  },
});