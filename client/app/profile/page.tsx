"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import EmailVerifiedGuard from "@/components/auth/EmailVerifiedGuard";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  Avatar, 
  Chip,
  Button,
  TextField,
  Typography,
  Box,
  Divider,
  Alert,
  Grid
} from "@mui/material";
import { 
  Person as PersonIcon,
  Email as EmailIcon,
  Verified as VerifiedIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Home as HomeIcon,
  Analytics as AnalyticsIcon,
  History as HistoryIcon,
  Business as BusinessIcon,
  NavigateNext as NavigateNextIcon
} from "@mui/icons-material";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
  console.log("ProfilePage component is rendering"); // Debug log
  
  const { user, refreshUser, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [saveLoading, setSaveLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const router = useRouter();

  // Debug logging
  console.log("Profile page - user:", user);
  console.log("Profile page - loading:", loading);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedName(user?.name || "");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(user?.name || "");
    setMessage(null);
  };

  const handleSave = async () => {
    if (!editedName.trim()) {
      setMessage({ text: "Name cannot be empty", type: "error" });
      return;
    }

    setSaveLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/update-profile", {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          ...(token && { "Authorization": `Bearer ${token}` })
        },
        body: JSON.stringify({ name: editedName.trim() })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update profile");
      }

      setMessage({ text: "Profile updated successfully!", type: "success" });
      setIsEditing(false);
      
      // Refresh user data in the context
      await refreshUser();
    } catch (error: any) {
      setMessage({ text: error.message || "Failed to update profile", type: "error" });
    } finally {
      setSaveLoading(false);
    }
  };

  const getSocialProviderIcon = (provider: string) => {
    switch (provider?.toLowerCase()) {
      case "google":
        return <FaGoogle className="text-red-500" />;
      case "github":
        return <FaGithub className="text-gray-800" />;
      default:
        return <PersonIcon className="text-gray-500" />;
    }
  };

  const getSocialProviderName = (provider: string) => {
    switch (provider?.toLowerCase()) {
      case "google":
        return "Google";
      case "github":
        return "GitHub";
      default:
        return "Email";
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="font-[family-name:var(--font-geist-sans)] bg-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="font-[family-name:var(--font-geist-sans)] bg-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
            <button 
              onClick={() => window.location.href = '/auth/login'}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go to Login
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600 mt-2 text-lg">Manage your account information and preferences</p>
          </div>

          {/* Alert Messages */}
          {message && (
            <Alert 
              severity={message.type} 
              onClose={() => setMessage(null)}
              className="mb-8"
            >
              {message.text}
            </Alert>
          )}

          {/* Navigation Card */}
          <div className="mb-10">
            <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <CardHeader
                title="Quick Navigation"
                subheader="Access other parts of Market Flick AI"
              />
              <Divider />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<HomeIcon />}
                      endIcon={<NavigateNextIcon />}
                      onClick={() => handleNavigation("/")}
                      className="justify-between h-14"
                      sx={{ justifyContent: "flex-start" }}
                    >
                      Home
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<AnalyticsIcon />}
                      endIcon={<NavigateNextIcon />}
                      onClick={() => handleNavigation("/analyze")}
                      className="justify-between h-14"
                      sx={{ justifyContent: "flex-start" }}
                    >
                      Analyze
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<HistoryIcon />}
                      endIcon={<NavigateNextIcon />}
                      onClick={() => handleNavigation("/previous-analysis")}
                      className="justify-between h-14"
                      sx={{ justifyContent: "flex-start" }}
                    >
                      Previous Analysis
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<BusinessIcon />}
                      endIcon={<NavigateNextIcon />}
                      onClick={() => handleNavigation("/investor")}
                      className="justify-between h-14"
                      sx={{ justifyContent: "flex-start" }}
                    >
                      Investor
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </div>

          {/* Profile Information Card */}
          <div className="mb-10">
            <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <CardHeader
                title="Personal Information"
                action={
                  !isEditing && (
                    <Button
                      startIcon={<EditIcon />}
                      onClick={handleEdit}
                      variant="outlined"
                      size="small"
                    >
                      Edit
                    </Button>
                  )
                }
              />
              <Divider />
              <CardContent>
                <div className="flex items-start space-x-6">
                  {/* Avatar */}
                  <Avatar
                    src="/avatar.png"
                    sx={{ width: 80, height: 80 }}
                  >
                    <PersonIcon />
                  </Avatar>

                  {/* User Details */}
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Full Name
                        </Typography>
                        {isEditing ? (
                          <TextField
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            fullWidth
                            size="small"
                            variant="outlined"
                          />
                        ) : (
                          <Typography variant="body1" className="font-medium">
                            {user.name}
                          </Typography>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Email Address
                        </Typography>
                        <div className="flex items-center space-x-2">
                          <EmailIcon className="text-gray-500" fontSize="small" />
                          <Typography variant="body1">
                            {user.email}
                          </Typography>
                          {user.is_verified && (
                            <Chip
                              icon={<VerifiedIcon />}
                              label="Verified"
                              color="success"
                              size="small"
                            />
                          )}
                        </div>
                      </div>

                      {/* Account Type */}
                      <div>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          Account Type
                        </Typography>
                        <div className="flex items-center space-x-2">
                          {getSocialProviderIcon(user.social_provider)}
                          <Typography variant="body1">
                            {getSocialProviderName(user.social_provider)} Account
                          </Typography>
                        </div>
                      </div>

                      {/* User ID */}
                      <div>
                        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                          User ID
                        </Typography>
                        <Typography variant="body2" className="font-mono text-gray-600">
                          {user._id}
                        </Typography>
                      </div>
                    </div>

                    {/* Edit Actions */}
                    {isEditing && (
                      <Box className="mt-4 flex space-x-2">
                        <Button
                          startIcon={<SaveIcon />}
                          onClick={handleSave}
                          variant="contained"
                          color="primary"
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          startIcon={<CancelIcon />}
                          onClick={handleCancel}
                          variant="outlined"
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Status Card */}
          <div className="mb-10">
            <Card className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <CardHeader title="Account Status" />
              <Divider />
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Email Verification
                    </Typography>
                    <Chip
                      icon={user.is_verified ? <VerifiedIcon /> : <EmailIcon />}
                      label={user.is_verified ? "Verified" : "Pending Verification"}
                      color={user.is_verified ? "success" : "warning"}
                    />
                  </div>
                  
                  <div>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Login Method
                    </Typography>
                    <div className="flex items-center space-x-2">
                      {getSocialProviderIcon(user.social_provider)}
                      <Typography variant="body2">
                        {user.social_provider && user.social_provider !== "none" 
                          ? `${getSocialProviderName(user.social_provider)} OAuth`
                          : "Email & Password"
                        }
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
