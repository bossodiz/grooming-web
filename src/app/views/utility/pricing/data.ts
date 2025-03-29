export const pricingPlan = [
  {
    name: 'Free',
    price: 24,
    currency: 'USD',
    billing_period: 'month',
    highlight: 'warning',
    icon: 'mdi mdi-rocket',
    plan_details: {
      description:
        'Our free plans are a self-service solution for small-sized teams to manage the ongoing project development workflow.',
      features: [
        '1 product',
        'Up to 500 subscribers',
        'Basic analytics',
        '12-hour support response time',
      ],
    },
    cta_button: {
      text: 'Buy Plan',
      url: '#',
      class: 'btn btn-outline-primary w-100 rounded-2 fw-medium',
    },
  },
  {
    name: 'Basic Personal',
    price: 32,
    currency: 'USD',
    billing_period: 'month',
    highlight: 'primary',
    icon: 'mdi mdi-account-supervisor',
    plan_details: {
      description:
        'Our basic plans are a self-service solution for small-sized teams to manage the ongoing project development workflow.',
      features: [
        '5 products',
        'Up to 1,000 subscribers',
        'Basic analytics',
        '24-hour support response time',
      ],
    },
    cta_button: {
      text: 'Buy Plan',
      url: '#',
      class: 'btn btn-primary w-100 rounded-2',
    },
  },
  {
    name: 'Startup',
    price: 48,
    currency: 'USD',
    billing_period: 'month',
    highlight: 'info',
    icon: 'mdi mdi-office-building',
    plan_details: {
      description:
        'Offer a comprehensive, scalable solution, and tailored for larger teams, enabling seamless workflows and development workflow.',
      features: [
        '25 products',
        'Up to 10,000 subscribers',
        'Advanced analytics',
        '48-hour support response time',
      ],
    },
    cta_button: {
      text: 'Buy Plan',
      url: '#',
      class: 'btn btn-outline-primary w-100 rounded-2 fw-medium',
    },
  },
  {
    name: 'Enterprise',
    price: 78,
    currency: 'USD',
    billing_period: 'month',
    highlight: 'warning',
    icon: 'mdi mdi-rocket',
    plan_details: {
      description:
        'Personalized subscriber solution for teams of any size, providing flexibility to adapt to specific project needs and seamless development workflow.',
      features: [
        'Unlimited products',
        'Unlimited subscribers',
        'Advanced analytics',
        'Unlimited Users',
      ],
    },
    cta_button: {
      text: 'Buy Plan',
      url: '#',
      class: 'btn btn-outline-primary w-100 rounded-2 fw-medium',
    },
  },
]
