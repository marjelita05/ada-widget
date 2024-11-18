
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { X, RotateCcw, MessageSquare, EyeOff, Search, Zap, Eye, Layout, Brain, Keyboard, Mic, Type, Underline, LinkIcon, AlignLeft, AlignCenter, AlignRight, ArrowUpDown, MoveHorizontal, Minus, Plus, Accessibility, Moon, Sun, SunMoon, Droplet, VolumeX, ImageOff, FileText, MousePointer2, Link2, ZapOff, LayoutTemplate, Hash, Target, HandMetal } from 'lucide-react'

type Profile = 'seizureSafe' | 'visionImpaired' | 'adhdFriendly' | 'cognitiveDisability' | 'keyboardNavigation' | 'blindUsers'

const initialProfiles: Record<Profile, boolean> = {
  seizureSafe: false,
  visionImpaired: false,
  adhdFriendly: false,
  cognitiveDisability: false,
  keyboardNavigation: false,
  blindUsers: false,
}

interface ContentAdjustments {
  contentScaling: number
  readableFont: boolean
  highlightTitles: boolean
  highlightLinks: boolean
  textMagnifier: boolean
  fontSize: number
  alignment: 'left' | 'center' | 'right'
  lineHeight: number
  letterSpacing: number
}

const initialContentAdjustments: ContentAdjustments = {
  contentScaling: 100,
  readableFont: false,
  highlightTitles: false,
  highlightLinks: false,
  textMagnifier: false,
  fontSize: 100,
  alignment: 'left',
  lineHeight: 100,
  letterSpacing: 100,
}

interface ColorAdjustments {
  contrast: 'dark' | 'light' | 'high' | null
  saturation: 'high' | 'monochrome' | 'low' | null
  textColor: string
  titleColor: string
  backgroundColor: string
}

const initialColorAdjustments: ColorAdjustments = {
  contrast: null,
  saturation: null,
  textColor: '#000000',
  titleColor: '#000000',
  backgroundColor: '#ffffff'
}

interface OrientationAdjustments {
  muteSounds: boolean
  hideImages: boolean
  readMode: boolean
  readingGuide: boolean
  stopAnimations: boolean
  readingMask: boolean
  highlightHover: boolean
  highlightFocus: boolean
  bigBlackCursor: boolean
  bigWhiteCursor: boolean
  usefulLink: string | null
}

const initialOrientationAdjustments: OrientationAdjustments = {
  muteSounds: false,
  hideImages: false,
  readMode: false,
  readingGuide: false,
  stopAnimations: false,
  readingMask: false,
  highlightHover: false,
  highlightFocus: false,
  bigBlackCursor: false,
  bigWhiteCursor: false,
  usefulLink: null
}

const colorOptions = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#ef4444', label: 'Red' },
  { value: '#f97316', label: 'Orange' },
  { value: '#14b8a6', label: 'Teal' },
  { value: '#84cc16', label: 'Green' },
  { value: '#ffffff', label: 'White' },
  { value: '#000000', label: 'Black' },
]

const profileIcons: Record<Profile, React.ReactNode> = {
  seizureSafe: <Zap className="h-6 w-6" />,
  visionImpaired: <Eye className="h-6 w-6" />,
  adhdFriendly: <Layout className="h-6 w-6" />,
  cognitiveDisability: <Brain className="h-6 w-6" />,
  keyboardNavigation: <Keyboard className="h-6 w-6" />,
  blindUsers: <Mic className="h-6 w-6" />,
}

export default function Page() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false)
  const [profiles, setProfiles] = useState(initialProfiles)
  const [contentAdjustments, setContentAdjustments] = useState<ContentAdjustments>(initialContentAdjustments)
  const [colorAdjustments, setColorAdjustments] = useState<ColorAdjustments>(initialColorAdjustments)
  const [orientationAdjustments, setOrientationAdjustments] = useState<OrientationAdjustments>(initialOrientationAdjustments)

  const toggleWidget = () => setIsWidgetOpen(prev => !prev)
  
  const toggleProfile = (profile: Profile) => {
    setProfiles(prev => ({ ...prev, [profile]: !prev[profile] }))
  }

  const adjustValue = (key: keyof ContentAdjustments, increment: number) => {
    setContentAdjustments(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'number' ? Math.max(0, (prev[key] as number) + increment) : prev[key]
    }))
  }

  const resetValue = (key: keyof ContentAdjustments) => {
    setContentAdjustments(prev => ({
      ...prev,
      [key]: initialContentAdjustments[key]
    }))
  }

  const toggleBoolean = (key: keyof ContentAdjustments) => {
    setContentAdjustments(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const setAlignment = (alignment: 'left' | 'center' | 'right') => {
    setContentAdjustments(prev => ({
      ...prev,
      alignment
    }))
  }

  const setContrast = (value: ColorAdjustments['contrast']) => {
    setColorAdjustments(prev => ({
      ...prev,
      contrast: prev.contrast === value ? null : value
    }))
  }

  const setSaturation = (value: ColorAdjustments['saturation']) => {
    setColorAdjustments(prev => ({
      ...prev,
      saturation: prev.saturation === value ? null : value
    }))
  }

  const setColor = (type: 'textColor' | 'titleColor' | 'backgroundColor', color: string) => {
    setColorAdjustments(prev => ({
      ...prev,
      [type]: color
    }))
  }

  const toggleOrientation = (key: keyof OrientationAdjustments) => {
    if (key === 'bigBlackCursor' && orientationAdjustments.bigWhiteCursor) {
      setOrientationAdjustments(prev => ({ ...prev, bigWhiteCursor: false }))
    } else if (key === 'bigWhiteCursor' && orientationAdjustments.bigBlackCursor) {
      setOrientationAdjustments(prev => ({ ...prev, bigBlackCursor: false }))
    }
    
    setOrientationAdjustments(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const setOrientationLink = (value: string) => {
    setOrientationAdjustments(prev => ({
      ...prev,
      usefulLink: value || null
    }))
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative">
      <main className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="text-[#6366f1]">Aut</span> Your Business
        </h1>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
          Faster
        </h1>
        
        <p className="text-lg md:text-xl mb-12 text-gray-800">
          Advanced <span className="text-[#6366f1]">Systems</span> Integration and{" "}
          <span className="text-[#6366f1]">Automation</span> for the purposes of{" "}
          <span className="text-[#6366f1]">Scaling</span> any business
        </p>

        <div className="flex flex-col items-center gap-4">
          <Button 
            className="h-12 px-8 text-lg bg-[#6366f1] hover:bg-[#5558e6] text-white rounded-full"
          >
            Book A No-Pressure Call Now
          </Button>
          
          <Button 
            variant="outline"
            className="h-12 px-8 text-lg border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1]/5 rounded-full"
          >
            Link Tree
          </Button>
        </div>
      </main>
      
      {!isWidgetOpen ? (
        <Button
          onClick={toggleWidget}
          className="fixed bottom-4 right-4 rounded-full p-2 bg-[#6366f1] text-white hover:bg-[#7678F1] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2"
        >
          <Accessibility className="h-6 w-6" />
          <span className="sr-only">Open accessibility menu</span>
        </Button>
      ) : (
        <div className="fixed top-4 right-4 w-[40vw] min-w-[300px] max-w-[600px] max-h-[calc(100vh-2rem)] bg-[#6366f1] text-white rounded-lg shadow-lg font-sans flex flex-col">
          <div className="p-6 border-b border-[#7678F1]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Accessibility Adjustments</h2>
              <Button variant="ghost" size="icon" onClick={toggleWidget}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close accessibility menu</span>
              </Button>
            </div>

            <div className="flex space-x-4 mb-6">
              <Button variant="secondary" size="sm" className="bg-[rgba(53,47,229,0.7)] hover:bg-[rgba(53,47,229,0.8)]">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Settings
              </Button>
              <Button variant="secondary" size="sm" className="bg-[rgba(53,47,229,0.7)] hover:bg-[rgba(53,47,229,0.8)]">
                <MessageSquare className="mr-2 h-4 w-4" />
                Statement
              </Button>
              <Button variant="secondary" size="sm" className="bg-[rgba(53,47,229,0.7)] hover:bg-[rgba(53,47,229,0.8)]">
                <EyeOff className="mr-2 h-4 w-4" />
                Hide Interface
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                className="w-full pl-10 bg-[rgba(53,47,229,0.7)] border-none text-white placeholder-gray-300"
                placeholder="Unclear content? Search in dictionary..."
              />
            </div>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            <div className="bg-white text-black p-6 rounded-lg space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">Choose the right accessibility profile for you</h3>

                {(Object.keys(profiles) as Profile[]).map((profile) => (
                  <div key={profile} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      {profileIcons[profile]}
                      <div>
                        <div className="font-semibold">{profile.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                        <div className="text-sm text-gray-600">{getProfileDescription(profile)}</div>
                      </div>
                    </div>
                    <Switch checked={profiles[profile]} onCheckedChange={() => toggleProfile(profile)} />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Content Adjustments</h3>
                
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      <span>Content Scaling</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => adjustValue('contentScaling', -10)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" onClick={() => resetValue('contentScaling')}>
                        Default
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => adjustValue('contentScaling', 10)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Type className="h-5 w-5" />
                      <span>Readable Font</span>
                    </div>
                    <Switch 
                      checked={contentAdjustments.readableFont}
                      onCheckedChange={() => toggleBoolean('readableFont')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Underline className="h-5 w-5" />
                      <span>Highlight Titles</span>
                    </div>
                    <Switch 
                      checked={contentAdjustments.highlightTitles}
                      onCheckedChange={() => toggleBoolean('highlightTitles')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-5 w-5" />
                      <span>Highlight Links</span>
                    </div>
                    <Switch 
                      checked={contentAdjustments.highlightLinks}
                      onCheckedChange={() => toggleBoolean('highlightLinks')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      <span>Text Magnifier</span>
                    </div>
                    <Switch 
                      checked={contentAdjustments.textMagnifier}
                      onCheckedChange={() => toggleBoolean('textMagnifier')}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Type className="h-5 w-5" />
                      <span>Adjust Font Sizing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => adjustValue('fontSize', -10)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" onClick={() => resetValue('fontSize')}>
                        Default
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => adjustValue('fontSize', 10)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button 
                      variant={contentAdjustments.alignment === 'left' ? 'default' : 'outline'}
                      onClick={() => setAlignment('left')}
                      className="flex items-center justify-center p-4 bg-gray-50 rounded-lg"
                    >
                      <AlignLeft className="h-5 w-5" />
                      <span className="ml-2">Align Left</span>
                    </Button>
                    <Button 
                      variant={contentAdjustments.alignment === 'center' ? 'default' : 'outline'}
                      onClick={() => setAlignment('center')}
                      className="flex items-center justify-center p-4 bg-gray-50 rounded-lg"
                    >
                      <AlignCenter className="h-5 w-5" />
                      <span className="ml-2">Align Center</span>
                    </Button>
                    <Button 
                      variant={contentAdjustments.alignment === 'right' ? 'default' : 'outline'}
                      onClick={() => setAlignment('right')}
                      className="flex items-center justify-center p-4 bg-gray-50 rounded-lg"
                    >
                      <AlignRight className="h-5 w-5" />
                      <span className="ml-2">Align Right</span>
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="h-5 w-5" />
                      <span>Adjust Line Height</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => adjustValue('lineHeight', -10)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" onClick={() => resetValue('lineHeight')}>
                        Default
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => adjustValue('lineHeight', 10)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <MoveHorizontal className="h-5 w-5" />
                      <span>Adjust Letter Spacing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => adjustValue('letterSpacing', -10)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" onClick={() => resetValue('letterSpacing')}>
                        Default
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => adjustValue('letterSpacing', 10)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Color Adjustments</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={colorAdjustments.contrast === 'dark' ? 'default' : 'outline'}
                    onClick={() => setContrast('dark')}
                    className="flex flex-col items-center gap-2 p-4 h-auto"
                  >
                    <Moon className="h-8 w-8" />
                    <span>Dark Contrast</span>
                  </Button>
                  
                  <Button
                    variant={colorAdjustments.contrast === 'light' ? 'default' : 'outline'}
                    onClick={() => setContrast('light')}
                    className="flex flex-col items-center gap-2 p-4 h-auto"
                  >
                    <Sun className="h-8 w-8" />
                    <span>Light Contrast</span>
                  </Button>
                  
                  <Button
                    variant={colorAdjustments.contrast === 'high' ? 'default' : 'outline'}
                    onClick={() => setContrast('high')}
                    className="flex flex-col items-center gap-2 p-4 h-auto"
                  >
                    <SunMoon className="h-8 w-8" />
                    <span>High Contrast</span>
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={colorAdjustments.saturation === 'high' ? 'default' : 'outline'}
                    onClick={() => setSaturation('high')}
                    className="flex flex-col items-center gap-2 p-4 h-auto"
                  >
                    <Droplet className="h-8 w-8 fill-current" />
                    <span>High Saturation</span>
                  </Button>
                  
                  <Button
                    variant={colorAdjustments.saturation === 'monochrome' ? 'default' : 'outline'}
                    onClick={() => setSaturation('monochrome')}
                    className="flex flex-col items-center gap-2 p-4 h-auto"
                  >
                    <Droplet className="h-8 w-8" />
                    <span>Monochrome</span>
                  </Button>
                  
                  <Button
                    variant={colorAdjustments.saturation === 'low' ? 'default' : 'outline'}
                    onClick={() => setSaturation('low')}
                    className="flex flex-col items-center gap-2 p-4 h-auto"
                  >
                    <Droplet className="h-8 w-8 opacity-50" />
                    <span>Low Saturation</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Adjust Text Colors</h4>
                    <div className="flex gap-2 flex-wrap">
                      {colorOptions.map((color) => (
                        <Button
                          key={color.value}
                          variant="outline"
                          className="w-8 h-8 rounded-full p-0"
                          style={{ backgroundColor: color.value, border: color.value === '#ffffff' ? '1px solid #e2e8f0' : 'none' }}
                          onClick={() => setColor('textColor', color.value)}
                        >
                          <span className="sr-only">Set text color to {color.label}</span>
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        className="text-sm"
                        onClick={() => setColor('textColor', initialColorAdjustments.textColor)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Adjust Title Colors</h4>
                    <div className="flex gap-2 flex-wrap">
                      {colorOptions.map((color) => (
                        <Button
                          key={color.value}
                          variant="outline"
                          className="w-8 h-8 rounded-full p-0"
                          style={{ backgroundColor: color.value, border: color.value === '#ffffff' ? '1px solid #e2e8f0' : 'none' }}
                          onClick={() => setColor('titleColor', color.value)}
                        >
                          <span className="sr-only">Set title color to {color.label}</span>
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        className="text-sm"
                        onClick={() => setColor('titleColor', initialColorAdjustments.titleColor)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Adjust Background Colors</h4>
                    <div className="flex gap-2 flex-wrap">
                      {colorOptions.map((color) => (
                        <Button
                          key={color.value}
                          variant="outline"
                          className="w-8 h-8 rounded-full p-0"
                          style={{ backgroundColor: color.value, border: color.value === '#ffffff' ? '1px solid #e2e8f0' : 'none' }}
                          onClick={() => setColor('backgroundColor', color.value)}
                        >
                          <span className="sr-only">Set background color to {color.label}</span>
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        className="text-sm"
                        onClick={() => setColor('backgroundColor', initialColorAdjustments.backgroundColor)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold">Orientation Adjustments</h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={orientationAdjustments.muteSounds ? 'default' : 'outline'}
                    onClick={() => toggleOrientation('muteSounds')}
                    className="flex flex-col items-center gap-2 p-4 h-auto aspect-square bg-gray-50"
                  >
                    <VolumeX className="h-8 w-8" />
                    <span>Mute Sounds</span>
                  </Button>
                  
                  <Button
                    variant={orientationAdjustments.hideImages ? 'default' : 'outline'}
                    onClick={() => toggleOrientation('hideImages')}
                    className="flex flex-col items-center gap-2 p-4 h-auto aspect-square bg-gray-50"
                  >
                    <ImageOff className="h-8 w-8" />
                    <span>Hide Images</span>
                  </Button>
                  
                  <Button
                    variant={orientationAdjustments.readMode ? 'default' : 'outline'}
                    onClick={() => toggleOrientation('readMode')}
                    className="flex flex-col items-center gap-2 p-4 h-auto aspect-square bg-gray-50"
                  >
                    <FileText className="h-8 w-8" />
                    <span>Read Mode</span>
                  </Button>
                  
                  <Button
                    variant={orientationAdjustments.readingGuide ? 'default' : 'outline'}
                    onClick={() => toggleOrientation('readingGuide')}
                    className="flex flex-col items-center gap-2 p-4 h-auto aspect-square bg-gray-50"
                  >
                    <MousePointer2 className="h-8 w-8" />
                    <span>Reading Guide</span>
                  </Button>
                  
                  <div className="col-span-2 bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Link2 className="h-6 w-6" />
                      <span className="text-lg">Useful Links</span>
                    </div>
                    <select 
                      className="w-full p-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={orientationAdjustments.usefulLink || ''}
                      onChange={(e) => setOrientationLink(e.target.value)}
                    >
                      <option value="">Select an option</option>
                      <option value="sitemap">Sitemap</option>
                      <option value="contact">Contact Form</option>
                      <option value="help">Help Center</option>
                    </select>
                  </div>
                  
                  <Button
                    variant={orientationAdjustments.stopAnimations ? 'default' : 'outline'}
                    onClick={() => toggleOrientation('stopAnimations')}
                    className="flex flex-col items-center gap-2 p-4 h-auto aspect-square bg-gray-50"
                  >
                    <ZapOff className="h-8 w-8" />
                    <span>Stop Animations</span>
                  </Button>
                  
                  <Button
                    variant={orientationAdjustments.readingMask ? 'default' : 'outline'}
                    onClick={() => toggleOrientation('readingMask')}
                    className="flex flex-col items-center gap-2 p-4 h-auto aspect-square bg-gray-50"
                  >
                    <LayoutTemplate className="h-8 w-8" />
                    <span>Reading Mask</span>
                  </Button>
                  
                  <Button
                    variant={orientationAdjustments.highlightHover ? 'default' : 'outline'}
                    onClick={() => toggleOrientation('highlightHover')}
                    className="flex flex-col items-center gap-2 p-4 h-auto aspect-square bg-gray-50"
                  >
                    <Hash className="h-8 w-8" />
                    <span>Highlight Hover</span>
                  </Button>
                  
                  <Button
                    variant={orientationAdjustments.highlightFocus ? 'default' : 'outline'}
                    onClick={() => toggleOrientation('highlightFocus')}
                    className="flex flex-col items-center gap-2 p-4 h-auto aspect-square bg-gray-50"
                  >
                    <Target className="h-8 w-8" />
                    <span>Highlight Focus</span>
                  </Button>
                  
                  <Button
                    variant={orientationAdjustments.bigBlackCursor ? 'default' : 'outline'}
                    onClick={() => toggleOrientation('bigBlackCursor')}
                    className="flex flex-col items-center gap-2 p-4 h-auto aspect-square bg-gray-50"
                  >
                    <HandMetal className="h-8 w-8" />
                    <span>Big Black Cursor</span>
                  </Button>
                  
                  <Button
                    variant={orientationAdjustments.bigWhiteCursor ? 'default' : 'outline'}
                    onClick={() => toggleOrientation('bigWhiteCursor')}
                    className="flex flex-col items-center gap-2 p-4 h-auto aspect-square bg-gray-50"
                  >
                    <HandMetal className="h-8 w-8 text-gray-400" />
                    <span>Big White Cursor</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-[#7678F1] text-center text-sm">
            Web Accessibility by Digital Kahuna <Button variant="link" className="text-white underline">Learn More</Button>
          </div>
        </div>
      )}
    </div>
  )
}

function getProfileDescription(profile: Profile): string {
  switch (profile) {
    case 'seizureSafe': return 'Clear flashes & reduces color'
    case 'visionImpaired': return 'Enhances website\'s visuals'
    case 'adhdFriendly': return 'More focus & fewer distractions'
    case 'cognitiveDisability': return 'Assists with reading & focusing'
    case 'keyboardNavigation': return 'Use website with the keyboard'
    case 'blindUsers': return 'Optimize website for screen-readers'
  }
}