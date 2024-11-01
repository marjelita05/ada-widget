import React, { useState } from 'react'
import { 
  X, 
  Zap, 
  Eye, 
  Brain, 
  BookOpen, 
  KeyRound, 
  Headphones, 
  Accessibility,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Minus,
  Plus,
  Type,
  Underline,
  Search,
  Link,
  ArrowUpDown, // Using ArrowUpDown for line height instead of LineHeight
  MoveHorizontal // Using MoveHorizontal for letter spacing
} from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

const profileIcons: Record<Profile, React.ReactNode> = {
  seizureSafe: <Zap className="h-6 w-6" />,
  visionImpaired: <Eye className="h-6 w-6" />,
  adhdFriendly: <Brain className="h-6 w-6" />,
  cognitiveDisability: <BookOpen className="h-6 w-6" />,
  keyboardNavigation: <KeyRound className="h-6 w-6" />,
  blindUsers: <Headphones className="h-6 w-6" />,
}

export default function LandingPage() {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false)
  const [profiles, setProfiles] = useState(initialProfiles)
  const [contentAdjustments, setContentAdjustments] = useState<ContentAdjustments>(initialContentAdjustments)

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

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-[#5D4FE5]">Aut</span> Your Business
        </h1>
        <h1 className="text-6xl font-bold mb-8">
          Faster
        </h1>
        <p className="text-xl mb-8">
          Advanced <span className="text-[#5D4FE5]">Systems</span> Integration and <span className="text-[#5D4FE5]">Automation</span> for the<br />
          purposes of <span className="text-[#5D4FE5]">Scaling</span> any business
        </p>
        <div className="space-y-4">
          <Button className="bg-[#5D4FE5] hover:bg-[#4A3ED4] text-white px-8 py-3 rounded-full text-lg">
            Book A No-Pressure Call Now
          </Button>
          <br />
          <Button variant="outline" className="border-[#5D4FE5] text-[#5D4FE5] hover:bg-[#5D4FE5] hover:text-white px-8 py-3 rounded-full text-lg">
            Link Tree
          </Button>
        </div>
      </main>
      
      {!isWidgetOpen ? (
        <Button
          onClick={toggleWidget}
          className="fixed bottom-4 right-4 rounded-full p-2 bg-[#d07021] text-white hover:bg-[#b05e1b] focus:outline-none focus:ring-2 focus:ring-[#d07021] focus:ring-offset-2"
        >
          <Accessibility className="h-6 w-6" />
          <span className="sr-only">Open accessibility menu</span>
        </Button>
      ) : (
        <div className="fixed top-4 right-4 w-[40vw] min-w-[300px] max-w-[600px] max-h-[calc(100vh-2rem)] bg-[#d07021] text-white rounded-lg shadow-lg font-sans flex flex-col">
          <div className="p-6 border-b border-[#e08541]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Accessibility Adjustments</h2>
              <Button variant="ghost" size="icon" onClick={toggleWidget}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close accessibility menu</span>
              </Button>
            </div>

            <div className="flex space-x-4 mb-6">
              <Button variant="secondary" size="sm" className="bg-[rgba(53,47,229,0.7)] hover:bg-[rgba(53,47,229,0.8)]" onClick={() => setContentAdjustments(initialContentAdjustments)}>Reset Settings</Button>
              <Button variant="secondary" size="sm" className="bg-[rgba(53,47,229,0.7)] hover:bg-[rgba(53,47,229,0.8)]">Statement</Button>
              <Button variant="secondary" size="sm" className="bg-[rgba(53,47,229,0.7)] hover:bg-[rgba(53,47,229,0.8)]">Hide Interface</Button>
            </div>

            <Select>
              <SelectTrigger className="w-full bg-[rgba(53,47,229,0.7)]">
                <SelectValue placeholder="Unclear content? Search in dictionary..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-grow overflow-y-auto p-6">
            <div className="bg-white text-black p-6 rounded-lg space-y-6">
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
                      <Link className="h-5 w-5" />
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
            </div>
          </div>

          <div className="p-6 border-t border-[#e08541] text-center text-sm">
            Web Accessibility by Digital Kahunassss <Button variant="link" className="text-white underline">Learn More</Button>
          </div>
        </div>
      )}
    </div>
  )
}