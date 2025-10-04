"use client";

import { useState, useEffect, useCallback } from "react";
import { useQueryState } from "nuqs";
import { Copy, FileText, Hash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import TitleHeader from "@/components/title-header";
import { encodeToBase64, decodeFromBase64 } from "@/lib/base64-utils";

const Base64EncoderPage = () => {
  const fullURL = typeof window !== "undefined" ? window.location.href : "";

  const [inputText, setInputText] = useQueryState("input", {
    parse: (value) => atob(decodeURIComponent(value)),
    serialize: (value) => encodeURIComponent(btoa(value)),
  });

  const [mode, setMode] = useQueryState("mode", {
    defaultValue: "encode",
  });

  const [outputText, setOutputText] = useState<string>("");
  const [error, setError] = useState<string>("");

  const processInput = useCallback(() => {
    if (!inputText || inputText.length === 0) {
      setOutputText("");
      setError("");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = encodeToBase64(inputText);
        setOutputText(encoded);
      } else {
        const decoded = decodeFromBase64(inputText);
        setOutputText(decoded);
      }
      setError("");
    } catch (err) {
      setError((err as Error).message);
      setOutputText("");
    }
  }, [inputText, mode]);


  const handleModeChange = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setOutputText("");
    setError("");
  };

  const handleInputChange = (value: string) => {
    setInputText(value);
    setOutputText("");
    setError("");
  };

  // Auto-process when input changes
  useEffect(() => {
    processInput();
  }, [processInput]);

  return (
    <section className="flex flex-col gap-2 w-full">
      <TitleHeader
        title="Base64 Encoder/Decoder"
        subtitle="Encode text to Base64 or decode Base64 to text."
        url={fullURL}
      />
      
      <div className="sticky top-0 bg-white">
        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === "encode" ? "default" : "outline"}
            onClick={() => handleModeChange("encode")}
            className="flex items-center gap-2"
          >
            <Hash size={16} />
            Encode
          </Button>
          <Button
            variant={mode === "decode" ? "default" : "outline"}
            onClick={() => handleModeChange("decode")}
            className="flex items-center gap-2"
          >
            <FileText size={16} />
            Decode
          </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="input-text">
            {mode === "encode" ? "Text to Encode" : "Base64 to Decode"}
          </Label>
          <Textarea
            id="input-text"
            value={inputText || ""}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode to Base64..." : "Enter Base64 string to decode..."}
            className="min-h-[120px] font-mono text-sm"
          />
        </div>

      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {outputText && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="output-text">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </Label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigator.clipboard.writeText(outputText)}
              className="flex items-center gap-2"
            >
              <Copy size={14} />
              Copy
            </Button>
          </div>
          <Textarea
            value={outputText}
            readOnly={true}
            placeholder="Output will appear here..."
            className="min-h-[120px] font-mono text-sm"
          />
        </div>
      )}

    </section>
  );
};

export default Base64EncoderPage;
