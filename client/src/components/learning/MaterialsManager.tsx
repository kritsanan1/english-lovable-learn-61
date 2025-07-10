import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Search, Filter, Upload, BookOpen, FileImage, FileAudio } from "lucide-react";

interface Material {
  id: string;
  title: string;
  type: 'PDF' | 'Audio' | 'Image' | 'Video';
  category: string;
  size: string;
  downloadCount: number;
  uploadedAt: string;
  downloadLink: string;
}

const sampleMaterials: Material[] = [
  {
    id: "1",
    title: "A1 Level Workbook",
    type: "PDF",
    category: "Workbooks",
    size: "2.5 MB",
    downloadCount: 45,
    uploadedAt: "2024-01-15",
    downloadLink: "#"
  },
  {
    id: "2", 
    title: "Vocabulary List - Week 1",
    type: "PDF",
    category: "Vocabulary",
    size: "1.2 MB",
    downloadCount: 32,
    uploadedAt: "2024-01-10",
    downloadLink: "#"
  },
  {
    id: "3",
    title: "Pronunciation Guide Audio",
    type: "Audio", 
    category: "Pronunciation",
    size: "15.8 MB",
    downloadCount: 28,
    uploadedAt: "2024-01-08",
    downloadLink: "#"
  },
  {
    id: "4",
    title: "Grammar Reference Chart",
    type: "Image",
    category: "Grammar",
    size: "890 KB",
    downloadCount: 67,
    uploadedAt: "2024-01-05",
    downloadLink: "#"
  }
];

export const MaterialsManager = () => {
  const [materials, setMaterials] = useState(sampleMaterials);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["all", ...new Set(materials.map(m => m.category))];
  
  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || material.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="w-8 h-8 text-red-500" />;
      case 'Audio': return <FileAudio className="w-8 h-8 text-green-500" />;
      case 'Image': return <FileImage className="w-8 h-8 text-blue-500" />;
      case 'Video': return <BookOpen className="w-8 h-8 text-purple-500" />;
      default: return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'Audio': return 'bg-green-100 text-green-800'; 
      case 'Image': return 'bg-blue-100 text-blue-800';
      case 'Video': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = (material: Material) => {
    // Update download count
    setMaterials(prev => prev.map(m => 
      m.id === material.id 
        ? { ...m, downloadCount: m.downloadCount + 1 }
        : m
    ));
    
    // In a real app, this would trigger the actual download
    console.log(`Downloading ${material.title}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Materials</CardTitle>
          <CardDescription>Access and manage your course materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>

          <Tabs defaultValue="grid">
            <TabsList className="mb-4">
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>

            <TabsContent value="grid">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMaterials.map((material) => (
                  <Card key={material.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {getFileIcon(material.type)}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">{material.title}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge className={getTypeColor(material.type)}>
                              {material.type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{material.size}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {material.category} • {material.downloadCount} downloads
                          </p>
                          <Button 
                            size="sm" 
                            className="w-full mt-3"
                            onClick={() => handleDownload(material)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="list">
              <div className="space-y-2">
                {filteredMaterials.map((material) => (
                  <Card key={material.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        {getFileIcon(material.type)}
                        <div>
                          <h3 className="font-semibold">{material.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{material.category}</span>
                            <span>{material.type} • {material.size}</span>
                            <span>{material.downloadCount} downloads</span>
                            <span>Uploaded {material.uploadedAt}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => handleDownload(material)}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredMaterials.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No materials found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};