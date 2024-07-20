// Format Card Number on payment card
export const formatCardNumber = (text: string) => {
  const cleaned = text.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = cleaned.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  return parts.length > 0 ? parts.join(" ") : text;
};
