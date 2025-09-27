'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { 
  Wand2, 
  Upload, 
  Type, 
  Image, 
  Music, 
  Video,
  Settings2,
  Play,
  Download,
  Share2
} from 'lucide-react';
import { VIDEO_TEMPLATES, TTS_VOICES } from '@/lib/constants';

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    script: '',
    voice: 'sarah',
    music: '',
    style: 'modern',
  });

  const steps = [
    { id: 1, title: 'Choose Template', icon: Video },
    { id: 2, title: 'Add Content', icon: Type },
    { id: 3, title: 'Customize', icon: Settings2 },
    { id: 4, title: 'Generate', icon: Wand2 },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose Your Template</h2>
              <p className="text-muted">Select a template that matches your video style</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {VIDEO_TEMPLATES.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`glass-card cursor-pointer transition-all duration-200 ${
                    selectedTemplate === template.id
                      ? 'ring-2 ring-accent bg-accent/5'
                      : 'hover:bg-surface/80'
                  }`}
                >
                  <div className="aspect-video bg-bg/50 rounded-t-lg mb-4 flex items-center justify-center">
                    <Video className="h-12 w-12 text-muted" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{template.name}</h3>
                    <p className="text-sm text-muted mb-3">{template.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                        {template.category}
                      </span>
                      <span className="text-muted">{template.duration}s</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Add Your Content</h2>
              <p className="text-muted">Provide the text and media for your video</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Video Title</label>
                  <input
                    type="text"
                    value={projectData.title}
                    onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                    placeholder="Enter your video title..."
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={projectData.description}
                    onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                    placeholder="Describe your video..."
                    rows={3}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Script / Narration</label>
                  <textarea
                    value={projectData.script}
                    onChange={(e) => setProjectData({...projectData, script: e.target.value})}
                    placeholder="Enter the text you want to be spoken in your video..."
                    rows={6}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Voice Selection</label>
                  <select
                    value={projectData.voice}
                    onChange={(e) => setProjectData({...projectData, voice: e.target.value})}
                    className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    {TTS_VOICES.map((voice) => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} ({voice.gender}, {voice.accent})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4 flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Upload Media
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                      <Image className="h-8 w-8 text-muted mx-auto mb-2" />
                      <p className="text-sm text-muted">Drop images here or click to upload</p>
                    </div>
                    
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent/50 transition-colors cursor-pointer">
                      <Music className="h-8 w-8 text-muted mx-auto mb-2" />
                      <p className="text-sm text-muted">Add background music</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Media Library</h3>
                  <p className="text-sm text-muted mb-4">
                    Browse our royalty-free media collection
                  </p>
                  <button className="btn-secondary w-full">
                    Browse Library
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Customize Your Video</h2>
              <p className="text-muted">Fine-tune the style and settings</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Visual Style</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Modern', 'Classic', 'Minimal', 'Bold'].map((style) => (
                      <button
                        key={style}
                        onClick={() => setProjectData({...projectData, style: style.toLowerCase()})}
                        className={`p-4 rounded-lg border transition-all duration-200 ${
                          projectData.style === style.toLowerCase()
                            ? 'border-accent bg-accent/10'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <div className="w-full h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded mb-2" />
                        <span className="text-sm font-medium">{style}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Animation Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Transition Speed</span>
                      <select className="bg-surface border border-border rounded px-3 py-1 text-sm">
                        <option>Slow</option>
                        <option>Medium</option>
                        <option>Fast</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Text Animation</span>
                      <select className="bg-surface border border-border rounded px-3 py-1 text-sm">
                        <option>Fade In</option>
                        <option>Slide Up</option>
                        <option>Typewriter</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Preview</h3>
                  <div className="aspect-video bg-bg/50 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Play className="h-12 w-12 text-muted mx-auto mb-2" />
                      <p className="text-sm text-muted">Preview will appear here</p>
                    </div>
                  </div>
                  <button className="btn-secondary w-full">
                    Generate Preview
                  </button>
                </div>

                <div className="glass-card p-6">
                  <h3 className="font-semibold mb-4">Export Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Quality</label>
                      <select className="w-full bg-surface border border-border rounded-lg px-4 py-2">
                        <option>1080p HD</option>
                        <option>720p</option>
                        <option>4K Ultra HD</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Format</label>
                      <select className="w-full bg-surface border border-border rounded-lg px-4 py-2">
                        <option>MP4</option>
                        <option>MOV</option>
                        <option>AVI</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Generate Your Video</h2>
              <p className="text-muted">AI is creating your masterpiece</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="glass-card p-8 text-center">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                  <Wand2 className="h-10 w-10 text-accent" />
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Processing Your Video</h3>
                <p className="text-muted mb-6">
                  Our AI is working its magic. This usually takes 2-5 minutes.
                </p>
                
                <div className="w-full bg-bg/50 rounded-full h-2 mb-6">
                  <div className="bg-accent h-2 rounded-full transition-all duration-1000 w-3/4" />
                </div>
                
                <div className="space-y-2 text-sm text-muted">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Script analysis complete</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span>Voice synthesis complete</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span>Generating visuals...</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-muted rounded-full" />
                    <span>Final rendering</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4">
                <button className="btn-secondary flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
                <button className="btn-secondary flex items-center justify-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <button className="btn-primary flex items-center justify-center">
                  <Play className="h-4 w-4 mr-2" />
                  Preview
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppShell>
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${
                    isActive ? 'text-accent' : isCompleted ? 'text-green-400' : 'text-muted'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      isActive 
                        ? 'border-accent bg-accent/10' 
                        : isCompleted 
                        ? 'border-green-400 bg-green-400/10'
                        : 'border-muted'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium hidden sm:block">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-400' : 'bg-muted'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="text-sm text-muted">
            Step {currentStep} of {steps.length}
          </div>
          
          <button
            onClick={handleNext}
            disabled={currentStep === 4 || (currentStep === 1 && !selectedTemplate)}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === 4 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
