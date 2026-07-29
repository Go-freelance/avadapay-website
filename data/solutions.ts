export interface SolutionData {
  id: string;
  translationKey: string;
  image?: string;
  externalUrl?: string;
  features: string[];
}

export const solutionsData: SolutionData[] = [
  {
    id: "online-payment",
    translationKey: "solutions.items.online-payment",
    features: [
      "solutions.items.online-payment.features.0",
      "solutions.items.online-payment.features.1",
      "solutions.items.online-payment.features.2",
    ],
  },
  {
    id: "bulk-payment",
    translationKey: "solutions.items.bulk-payment",
    features: [
      "solutions.items.bulk-payment.features.0",
      "solutions.items.bulk-payment.features.1",
      "solutions.items.bulk-payment.features.2",
      "solutions.items.bulk-payment.features.3",
      "solutions.items.bulk-payment.features.4",
    ],
  },
  {
    id: "bulk-sms",
    translationKey: "solutions.items.bulk-sms",
    features: [
      "solutions.items.bulk-sms.features.0",
      "solutions.items.bulk-sms.features.1",
    ],
  },
  {
    id: "avadaschool",
    translationKey: "solutions.items.avadaschool",
    image: "/images/phone.png",
    externalUrl: "https://www.avadaschool.com/",
    features: [
      "solutions.items.avadaschool.features.0",
      "solutions.items.avadaschool.features.1",
      "solutions.items.avadaschool.features.2",
      "solutions.items.avadaschool.features.3",
      "solutions.items.avadaschool.features.4",
      "solutions.items.avadaschool.features.5",
      "solutions.items.avadaschool.features.6",
      "solutions.items.avadaschool.features.7",
    ],
  },
  {
    id: "avadachurch",
    translationKey: "solutions.items.avadachurch",
    image: "/images/avadachurch.png",
    externalUrl: "https://www.avadachurch.com/",
    features: [
      "solutions.items.avadachurch.features.0",
      "solutions.items.avadachurch.features.1",
      "solutions.items.avadachurch.features.2",
      "solutions.items.avadachurch.features.3",
    ],
  },
];
