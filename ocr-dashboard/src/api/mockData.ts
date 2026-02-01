export interface OCRRequest {
  id: string;
  customerName: string;
  status: "pending" | "processed" | "rejected";
  date: string;
  confidenceScore: number;
  type: "Invoice" | "ID Card" | "Receipt";
}

export const MockData: OCRRequest[] = [
  {
    id: "1",
    customerName: "TechCorp Solutions",
    status: "processed",
    date: "2024-01-15",
    confidenceScore: 0.98,
    type: "Invoice",
  },
  {
    id: "2",
    customerName: "Global Logistics",
    status: "pending",
    date: "2024-01-16",
    confidenceScore: 0.75,
    type: "Receipt",
  },
  {
    id: "3",
    customerName: "Alice Johnson",
    status: "rejected",
    date: "2024-01-17",
    confidenceScore: 0.45,
    type: "ID Card",
  },
  {
    id: "4",
    customerName: "Nexus Systems",
    status: "processed",
    date: "2024-01-18",
    confidenceScore: 0.92,
    type: "Invoice",
  },
  {
    id: "5",
    customerName: "Swift Retail",
    status: "pending",
    date: "2024-01-19",
    confidenceScore: 0.88,
    type: "Receipt",
  },
  {
    id: "6",
    customerName: "Blue Horizon Inc",
    status: "processed",
    date: "2024-01-20",
    confidenceScore: 0.96,
    type: "Invoice",
  },
  {
    id: "7",
    customerName: "Sarah Miller",
    status: "rejected",
    date: "2024-01-21",
    confidenceScore: 0.3,
    type: "ID Card",
  },
  {
    id: "8",
    customerName: "Peak Performance",
    status: "pending",
    date: "2024-01-22",
    confidenceScore: 0.82,
    type: "Receipt",
  },
];
