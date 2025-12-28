const mockPdfBuffer = Uint8Array.from([1, 2, 3, 4]);

const mockPage = {
  setContent: jest.fn().mockResolvedValue(undefined),
  pdf: jest.fn().mockResolvedValue(mockPdfBuffer),
};

const mockBrowser = {
  newPage: jest.fn().mockResolvedValue(mockPage),
  close: jest.fn().mockResolvedValue(undefined),
};

export default {
  launch: jest.fn().mockResolvedValue(mockBrowser),
};
