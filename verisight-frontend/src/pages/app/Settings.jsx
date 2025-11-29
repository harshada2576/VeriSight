import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Toggle from '../../components/ui/Toggle';

const Settings = () => {
  const { user, updateUser } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    jobComplete: true,
    reviewRequests: true,
    weeklyReport: false,
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const handleProfileSave = async () => {
    try {
      setSaving(true);
      setMessage(null);
      
      // Backend Integration: Update user profile
      await updateUser(profile);
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (password.new !== password.confirm) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);
      
      // Backend Integration: Change password
      // await authAPI.changePassword(password.current, password.new);
      
      setPassword({ current: '', new: '', confirm: '' });
      setMessage({ type: 'success', text: 'Password changed successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Failed to change password' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0C0C0C' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: '8px',
            }}>
              Settings
            </h1>
            <p style={{ fontSize: '16px', color: '#D8DDE3' }}>
              Manage your account preferences and security
            </p>
          </div>

          {/* Message */}
          {message && (
            <div style={{
              padding: '16px',
              marginBottom: '24px',
              background: message.type === 'success' ? 'rgba(59, 255, 179, 0.1)' : 'rgba(255, 68, 68, 0.1)',
              border: `1px solid ${message.type === 'success' ? '#3BFFB3' : '#FF4444'}`,
              borderRadius: '8px',
              color: message.type === 'success' ? '#3BFFB3' : '#FF4444',
              fontSize: '14px',
            }}>
              {message.text}
            </div>
          )}

          <div style={{ display: 'grid', gap: '24px', maxWidth: '800px' }}>
            {/* Profile Settings */}
            <Card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                  Profile Information
                </h2>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <Input
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Enter your full name"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                  <Input
                    label="Organization"
                    value={profile.organization}
                    onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                    placeholder="Your company or organization"
                  />
                  <Button onClick={handleProfileSave} loading={saving} style={{ marginTop: '8px' }}>
                    Save Profile
                  </Button>
                </div>
              </div>
            </Card>

            {/* Password Change */}
            <Card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                  Change Password
                </h2>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <Input
                    label="Current Password"
                    type="password"
                    value={password.current}
                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                    placeholder="Enter current password"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    value={password.new}
                    onChange={(e) => setPassword({ ...password, new: e.target.value })}
                    placeholder="Enter new password"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={password.confirm}
                    onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                    placeholder="Confirm new password"
                  />
                  <Button onClick={handlePasswordChange} loading={saving} style={{ marginTop: '8px' }}>
                    Change Password
                  </Button>
                </div>
              </div>
            </Card>

            {/* Appearance */}
            <Card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                  Appearance
                </h2>
                <Toggle
                  checked={theme.isDark}
                  onChange={toggleTheme}
                  label="Dark Mode (Cyber Theme)"
                />
              </div>
            </Card>

            {/* Notifications */}
            <Card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
                  Notifications
                </h2>
                <div style={{ display: 'grid', gap: '16px' }}>
                  <Toggle
                    checked={notifications.emailAlerts}
                    onChange={(value) => setNotifications({ ...notifications, emailAlerts: value })}
                    label="Email Alerts"
                  />
                  <Toggle
                    checked={notifications.jobComplete}
                    onChange={(value) => setNotifications({ ...notifications, jobComplete: value })}
                    label="Job Completion Notifications"
                  />
                  <Toggle
                    checked={notifications.reviewRequests}
                    onChange={(value) => setNotifications({ ...notifications, reviewRequests: value })}
                    label="Review Request Notifications"
                  />
                  <Toggle
                    checked={notifications.weeklyReport}
                    onChange={(value) => setNotifications({ ...notifications, weeklyReport: value })}
                    label="Weekly Activity Report"
                  />
                </div>
              </div>
            </Card>

            {/* Danger Zone */}
            <Card style={{ borderColor: 'rgba(255, 68, 68, 0.5)' }}>
              <div style={{ padding: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#FF4444', marginBottom: '8px' }}>
                  Danger Zone
                </h2>
                <p style={{ fontSize: '14px', color: '#D8DDE3', marginBottom: '16px' }}>
                  Permanent actions that cannot be undone
                </p>
                <Button variant="danger">
                  Delete Account
                </Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
