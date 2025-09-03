import { onAuthenticateUser } from "@/actions/auth";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
} from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const userExist = await onAuthenticateUser();
  if (!userExist.user) {
    redirect("/sign-in");
  }

  return (
    <div className="w-full mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="w-full p-6 border border-input rounded-lg bg-background shadow-sm">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mr-4">
              <User />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Profile Settings
              </h2>
              <p className="text-muted-foreground text-sm">
                Manage your profile information and preferences
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <p className="text-muted-foreground">{userExist.user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-muted-foreground">{userExist.user.email}</p>
            </div>
          </div>
        </div>

        {/* Webinar Preferences */}
        <div className="w-full p-6 border border-input rounded-lg bg-background shadow-sm">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center mr-4">
              <SettingsIcon />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Webinar Preferences
              </h2>
              <p className="text-muted-foreground text-sm">
                Configure your webinar settings and defaults
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Default Webinar Duration</label>
                <p className="text-muted-foreground text-xs">Set default duration for new webinars</p>
              </div>
              <span className="text-sm text-muted-foreground">60 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Auto-start Recording</label>
                <p className="text-muted-foreground text-xs">Automatically start recording when webinar begins</p>
              </div>
              <span className="text-sm text-muted-foreground">Disabled</span>
            </div>
          </div>
        </div>

        {/* AI Agent Settings */}
        <div className="w-full p-6 border border-input rounded-lg bg-background shadow-sm">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mr-4">
              <Shield />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">
                AI Agent Settings
              </h2>
              <p className="text-muted-foreground text-sm">
                Configure your AI agent behavior and responses
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Call Duration Limit</label>
                <p className="text-muted-foreground text-xs">Maximum duration for AI agent calls</p>
              </div>
              <span className="text-sm text-muted-foreground">3 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Voice Settings</label>
                <p className="text-muted-foreground text-xs">Configure voice preferences for AI agent</p>
              </div>
              <span className="text-sm text-muted-foreground">Default</span>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="w-full p-6 border border-input rounded-lg bg-background shadow-sm">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mr-4">
              <Bell />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Notifications
              </h2>
              <p className="text-muted-foreground text-sm">
                Manage your notification preferences
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Webinar Reminders</label>
                <p className="text-muted-foreground text-xs">Get notified before your webinars start</p>
              </div>
              <span className="text-sm text-muted-foreground">Enabled</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Attendee Registrations</label>
                <p className="text-muted-foreground text-xs">Notifications for new attendee registrations</p>
              </div>
              <span className="text-sm text-muted-foreground">Enabled</span>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="w-full p-6 border border-input rounded-lg bg-background shadow-sm">
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mr-4">
              <Palette />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-primary">
                Appearance
              </h2>
              <p className="text-muted-foreground text-sm">
                Customize the look and feel of your webinars
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Theme</label>
                <p className="text-muted-foreground text-xs">Choose your preferred theme</p>
              </div>
              <span className="text-sm text-muted-foreground">System</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">Language</label>
                <p className="text-muted-foreground text-xs">Select your preferred language</p>
              </div>
              <span className="text-sm text-muted-foreground">English</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;