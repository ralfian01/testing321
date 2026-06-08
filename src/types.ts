/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  period: string;
  type: 'personal' | 'enterprise';
  features: string[];
  recommended?: boolean;
  maxRespondents: number;
  specs: {
    [key: string]: string | boolean;
  };
}

export interface SurveyService {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  targetAudience: string;
  basePrice: number;
}

export interface SurveyFeedback {
  id: string;
  ageGroup: string;
  frequency: string;
  preferredPlatform: string;
  rating: number;
  submittedAt: string;
}
