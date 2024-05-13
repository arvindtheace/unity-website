import { Builder } from "@builder.io/react";
import dynamic from "next/dynamic";

Builder.registerComponent(
  dynamic(() => import("./components/Button")),
  {
    name: "Button",
    friendlyName: "Button",
    inputs: [
      {
        name: "text",
        type: "string",
        friendlyName: "Text",
        required: true,
        defaultValue: "Click Me",
      },
      {
        name: "type",
        type: "string",
        friendlyName: "Type",
        required: true,
        defaultValue: "primary",
        enum: [
          {
            label: "Primary",
            value: "primary",
          },
          {
            label: "Secondary",
            value: "secondary",
          },
          {
            label: "Tertiary",
            value: "tertiary",
          },
          {
            label: "Link",
            value: "link",
          },
        ],
      },
      {
        name: "action",
        friendlyName: "Action",
        type: "string",
        required: true,
        defaultValue: "link",
        enum: [
          {
            label: "Link",
            value: "link",
          },
          {
            label: "Pop-up Form",
            value: "form",
          },
        ],
      },
      {
        name: "popup",
        type: "string",
        friendlyName: "Popup",
        defaultValue: "contact",
        enum: [
          {
            label: "Interest Rates",
            value: "interestRates",
          },
          {
            label: "Contact",
            value: "contact",
          },
        ],
        showIf: (options) => options.get("action") === "form",
      },
      {
        name: "withResume",
        type: "boolean",
        friendlyName: "With Resume?",
        defaultValue: false,
        showIf: (options) =>
          options.get("action") === "form" &&
          options.get("popup") === "contact",
      },
      {
        name: "href",
        type: "string",
        friendlyName: "Link",
        required: true,
        defaultValue: "/",
        showIf: (options) => options.get("action") === "link",
      },
      {
        name: "linkType",
        type: "string",
        friendlyName: "Link Type",
        required: true,
        defaultValue: "internal",
        enum: [
          {
            label: "Internal",
            value: "internal",
          },
          {
            label: "External",
            value: "external",
          },
        ],
      },
      {
        name: "icon",
        type: "string",
        friendlyName: "Icon",
        required: false,
        defaultValue: "arrow-right",
        enum: [
          {
            label: "None",
            value: "",
          },
          {
            label: "Arrow Right",
            value: "arrow-right",
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/ColorChangingSection")),
  {
    name: "ColorChangingSection",
    friendlyName: "Color Changing Section",
    defaultChildren: [
      {
        "@type": "@builder.io/sdk:Element",
        component: {
          name: "Text",
          options: { text: "I am child text block!" },
        },
      },
    ],
    inputs: [
      {
        name: "beforeColor",
        type: "color",
        friendlyName: "Before Color",
        required: true,
      },
      {
        name: "bgColor",
        type: "color",
        friendlyName: "After Color",
        required: true,
      },
      {
        name: "text",
        type: "richText",
        friendlyName: "Text",
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/ChecklistDocuments")),
  {
    name: "ChecklistDocuments",
    friendlyName: "Checklist Documents",
    inputs: [
      {
        name: "theme",
        type: "string",
        friendlyName: "Theme",
        enum: [
          {
            label: "Light",
            value: "light",
          },
          {
            label: "Dark",
            value: "dark",
          },
        ],
        required: true,
        defaultValue: "light",
      },
      {
        name: "hasSameDocuments",
        type: "boolean",
        friendlyName: "Same documents for all?",
        required: true,
        defaultValue: false,
      },
      {
        name: "checklistItems",
        type: "list",
        required: true,
        defaultValue: [
          {
            title: "Checklist Item",
            documents: [
              {
                title: "Name of Document",
              },
            ],
          },
        ],
        subFields: [
          {
            name: "title",
            type: "text",
            required: true,
            defaultValue: "Checklist Item",
          },
          {
            name: "documents",
            type: "list",
            required: true,
            subFields: [
              {
                name: "title",
                type: "string",
                required: true,
                defaultValue: "Document Title",
              },
            ],
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/FAQs")),
  {
    name: "FAQs",
    friendlyName: "FAQ Section",
    inputs: [
      {
        name: "theme",
        type: "string",
        friendlyName: "Theme",
        enum: [
          {
            label: "Light",
            value: "light",
          },
          {
            label: "Dark",
            value: "dark",
          },
        ],
        required: true,
        defaultValue: "light",
      },
      {
        name: "faqs",
        type: "list",
        required: true,
        subFields: [
          {
            name: "question",
            type: "string",
            required: true,
            defaultValue: "Question",
          },
          {
            name: "answer",
            type: "text",
            required: true,
            defaultValue: "Answer",
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/BlogPreview")),
  {
    name: "BlogPreview",
    friendlyName: "Blog Preview",
    inputs: [
      {
        name: "size",
        type: "string",
        friendlyName: "Size",
        defaultValue: "small",
        enum: [
          {
            label: "Small",
            value: "small",
          },
          {
            label: "Large",
            value: "large",
          },
        ],
      },
      {
        name: "blogs",
        type: "list",
        subFields: [
          {
            name: "article",
            type: "reference",
            model: "blog-articles",
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/ProgressCarousel")),
  {
    name: "ProgressCarousel",
    friendlyName: "Progress Bar Carousel",
    inputs: [
      {
        name: "sections",
        type: "list",
        required: true,
        subFields: [
          {
            name: "title",
            type: "text",
            required: true,
            defaultValue: "Section Name",
          },
          {
            name: "startingSlideNumber",
            type: "number",
            required: true,
            defaultValue: 1,
          },
          {
            name: "cards",
            type: "list",
            required: true,
            subFields: [
              {
                name: "content",
                type: "richText",
                required: true,
                defaultValue: "Card Content",
              },
              {
                name: "link",
                type: "string",
                required: true,
                defaultValue: "/",
              },
              {
                name: "illustration",
                type: "code",
                required: true,
                defaultValue: "<svg>...</svg>",
              },
            ],
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/Typewriter")),
  {
    name: "Typewriter",
    friendlyName: "Typewriter",
    inputs: [
      {
        name: "strings",
        type: "list",
        required: true,
        subFields: [
          {
            name: "string",
            type: "string",
            required: true,
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/BoardOfDirectors")),
  {
    name: "BoardOfDirectors",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/ManagementTeam")),
  {
    name: "ManagementTeam",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/RegulatoryDisclosures")),
  {
    name: "RegulatoryDisclosures",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/CTACarousel")),
  {
    name: "CTACarousel",
    inputs: [
      {
        name: "items",
        type: "list",
        required: true,
        subFields: [
          {
            name: "title",
            type: "string",
            required: true,
            defaultValue: "Title",
          },
          {
            name: "description",
            type: "text",
            required: true,
            defaultValue: "Description",
          },
          {
            name: "illustration",
            type: "code",
            required: true,
          },
          {
            name: "href",
            type: "string",
            required: true,
            defaultValue: "/",
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/PDFList")),
  {
    name: "PDFList",
    inputs: [
      {
        name: "hasFilter",
        type: "boolean",
        required: true,
      },
      {
        name: "name",
        type: "string",
        required: true,
      },
      {
        name: "searchAlign",
        type: "string",
        required: true,
        defaultValue: "left",
        enum: [
          {
            label: "Left",
            value: "left",
          },
          {
            label: "Center",
            value: "center",
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/RiveAnimation")),
  {
    name: "RiveAnimation",
    inputs: [
      {
        name: "rivFile",
        friendlyName: "Rive File Link",
        type: "string",
        required: true,
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/GSTINTable")),
  {
    name: "GSTINTable",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/FullFAQs")),
  {
    name: "FullFAQs",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/InvestorsDisclosures")),
  {
    name: "InvestorsDisclosures",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/FundRaisingProducts")),
  {
    name: "FundRaisingProducts",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/FixedIncomeProducts")),
  {
    name: "FixedIncomeProducts",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/AppreciationForm")),
  {
    name: "AppreciationForm",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/MediaCentres")),
  {
    name: "MediaCentres",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/ImageSwitcher")),
  {
    name: "ImageSwitcher",
    inputs: [
      {
        name: "data",
        type: "list",
        required: true,
        subFields: [
          {
            name: "title",
            type: "string",
            required: true,
          },
          {
            name: "code",
            type: "code",
            required: true,
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/TestimonialCarousel")),
  {
    name: "TestimonialCarousel",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/PMCBankSchemes")),
  {
    name: "PMCBankSchemes",
    inputs: [
      {
        name: "retailCards",
        type: "list",
        required: true,
        subFields: [
          {
            name: "color",
            type: "color",
            required: true,
          },
          {
            name: "amount",
            type: "string",
          },
          {
            name: "content",
            type: "richText",
            required: true,
          },
          {
            name: "hasModal",
            type: "boolean",
            required: true,
            defaultValue: false,
          },
          {
            name: "reimbursmentSteps",
            type: "list",
            required: true,
            subFields: [
              {
                name: "month",
                type: "string",
                required: true,
              },
              {
                name: "description",
                type: "richText",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "institutionalDepositorsContent",
        type: "richText",
        required: true,
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/DocumentCard")),
  {
    name: "DocumentCard",
    inputs: [
      {
        name: "type",
        type: "string",
        required: true,
        enum: [
          {
            label: "PDF",
            value: "pdf",
          },
          {
            label: "Link",
            value: "link",
          },
        ],
      },
      {
        name: "file",
        type: "file",
        showIf: (options) => options.get("type") === "pdf",
      },
      {
        name: "link",
        type: "string",
        showIf: (options) => options.get("type") === "link",
      },
      {
        name: "title",
        type: "string",
        required: true,
      },
      {
        name: "date",
        type: "string",
      },
      {
        name: "description",
        type: "string",
      },
    ],
  }
);
// Register Table component

Builder.registerComponent(
  dynamic(() => import("./components/Table")),
  {
    name: "Table",
    friendlyName: "Table",
    inputs: [
      {
        name: "headers",
        type: "list",
        subFields: [
          {
            name: "header",
            type: "string",
          },
        ],
      },
      {
        name: "rows",
        type: "list",
        subFields: [
          {
            name: "row",
            type: "list",
            subFields: [
              {
                name: "cell",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
  }
);
// register DropdownCard component

Builder.registerComponent(
  dynamic(() => import("./components/DropdownCard")),
  {
    name: "DropdownCard",
    friendlyName: "Dropdown Card",
    inputs: [
      {
        name: "title",
        type: "string",
        friendlyName: "Title",
        required: true,
      },
      {
        name: "content",
        type: "richText",
        friendlyName: "Content",
        required: true,
      },
    ],
  }
);
// register CuratedProductCard component

Builder.registerComponent(
  dynamic(() => import("./components/CuratedProductCard")),
  {
    name: "CuratedProductCard",
    friendlyName: "Curated Product Card",
    inputs: [
      {
        name: "title",
        type: "string",
        friendlyName: "Title",
        required: true,
      },
      {
        name: "content",
        type: "richText",
        friendlyName: "Content",
        required: true,
      },
      {
        name: "headers",
        friendlyName: "Table Headers",
        type: "list",
        subFields: [
          {
            name: "header",
            type: "string",
          },
        ],
      },
      {
        name: "rows",
        friendlyName: "Table Rows",
        type: "list",
        subFields: [
          {
            name: "row",
            type: "list",
            subFields: [
              {
                name: "cell",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/BlogCategoryCarousel")),
  {
    name: "BlogCategoryCarousel",
    inputs: [
      {
        name: "category",
        type: "string",
        required: true,
      },
      {
        name: "count",
        type: "number",
        required: true,
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/FeaturedBlogCarousel")),
  {
    name: "FeaturedBlogCarousel",
    inputs: [
      {
        name: "blogs",
        type: "list",
        required: true,
        subFields: [
          {
            name: "article",
            type: "reference",
            model: "blog-articles",
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/FDCalculator")),
  {
    name: "FDCalculator",
    inputs: [
      {
        name: "title",
        friendlyName: "Card Title",
        type: "string",
        required: true,
      },
      {
        name: "cta",
        friendlyName: "CTA Text",
        type: "string",
        required: true,
      },
      {
        name: "ctaLink",
        friendlyName: "CTA Link",
        type: "string",
        required: true,
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/RDCalculator")),
  {
    name: "RDCalculator",
    inputs: [
      {
        name: "title",
        friendlyName: "Card Title",
        type: "string",
        required: true,
      },
      {
        name: "cta",
        friendlyName: "CTA Text",
        type: "string",
        required: true,
      },
      {
        name: "ctaLink",
        friendlyName: "CTA Link",
        type: "string",
        required: true,
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/HeroSection")),
  {
    name: "HeroSection",
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/FundsAccessInstructions")),
  {
    name: "FundsAccessInstructions"
  }
)

Builder.registerComponent(
  dynamic(() => import("./components/BlogPreview2")),
  {
    name: "BlogPreview2",
    friendlyName: "Temp Blog Preview",
    inputs: [
      {
        name: "size",
        type: "string",
        friendlyName: "Size",
        defaultValue: "small",
        enum: [
          {
            label: "Small",
            value: "small",
          },
          {
            label: "Large",
            value: "large",
          },
        ],
      },
      {
        name: "blogs",
        type: "list",
        subFields: [
          {
            name: "article",
            type: "reference",
            model: "blog-articles",
          },
        ],
      },
    ],
  }
);

Builder.registerComponent(
  dynamic(() => import("./components/DigitalLendingPartners")),
  {
    name: "DigitalLendingPartners"
  }
)