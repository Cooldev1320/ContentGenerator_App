import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';

interface FooterProps {
  showFooter?: boolean;
}

export default function Footer({ showFooter = true }: FooterProps) {
  if (!showFooter) return null;

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const footerLinks = [
    { title: 'About', url: 'https://example.com/about' },
    { title: 'Help', url: 'https://example.com/help' },
    { title: 'Privacy', url: 'https://example.com/privacy' },
    { title: 'Terms', url: 'https://example.com/terms' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.brand}>
          <Text style={styles.brandName}>Content Generator</Text>
          <Text style={styles.brandTagline}>
            Create stunning content with ease
          </Text>
        </View>

        <View style={styles.links}>
          {footerLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={styles.link}
              onPress={() => handleLinkPress(link.url)}
            >
              <Text style={styles.linkText}>{link.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.copyright}>
          © 2024 Content Generator. All rights reserved.
        </Text>
        <View style={styles.social}>
          <TouchableOpacity
            style={styles.socialLink}
            onPress={() => handleLinkPress('https://twitter.com')}
          >
            <Text style={styles.socialIcon}>🐦</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialLink}
            onPress={() => handleLinkPress('https://facebook.com')}
          >
            <Text style={styles.socialIcon}>📘</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialLink}
            onPress={() => handleLinkPress('https://linkedin.com')}
          >
            <Text style={styles.socialIcon}>💼</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1f2937',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  brand: {
    flex: 1,
  },
  brandName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  brandTagline: {
    fontSize: 14,
    color: '#9ca3af',
  },
  links: {
    flexDirection: 'row',
    gap: 16,
  },
  link: {
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 14,
    color: '#d1d5db',
    fontWeight: '500',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
  },
  copyright: {
    fontSize: 12,
    color: '#9ca3af',
  },
  social: {
    flexDirection: 'row',
    gap: 12,
  },
  socialLink: {
    padding: 4,
  },
  socialIcon: {
    fontSize: 16,
  },
});
