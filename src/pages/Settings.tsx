import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { useSettings } from '@/contexts/SettingsContext'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useToast } from '@/components/ui/use-toast'

export default function Settings() {
  const {
    timeFormat,
    dateFormat,
    weekStartDay,
    defaultEventCategory,
    notifications,
    setSetting,
    resetSettings,
  } = useSettings()
  const { toast } = useToast()

  const handleSave = () => {
    // Settings are saved on change; just provide feedback
    toast({
      title: 'Settings saved',
      description: 'Your preferences have been updated.',
    })
  }

  const handleReset = () => {
    resetSettings()
    toast({
      title: 'Settings reset',
      description: 'Defaults have been restored.',
    })
  }

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Settings
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground text-center max-w-2xl">
            Customize your preferences below. Changes are saved instantly.
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Time Format</CardTitle>
                  <CardDescription>
                    Choose 12-hour or 24-hour time display.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={timeFormat}
                    onValueChange={(val) =>
                      setSetting('timeFormat', val as typeof timeFormat)
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-hour</SelectItem>
                      <SelectItem value="24h">24-hour</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Date Format</CardTitle>
                  <CardDescription>
                    Select how dates are displayed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={dateFormat}
                    onValueChange={(val) =>
                      setSetting('dateFormat', val as typeof dateFormat)
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Week Start Day</CardTitle>
                  <CardDescription>
                    Choose whether your week starts on Sunday or Monday.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={String(weekStartDay)}
                    onValueChange={(val) =>
                      setSetting('weekStartDay', Number(val) as 0 | 1)
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Sunday</SelectItem>
                      <SelectItem value="1">Monday</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Event Category</CardTitle>
                  <CardDescription>
                    Pick the category used when creating new events.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select
                    value={defaultEventCategory}
                    onValueChange={(val) =>
                      setSetting('defaultEventCategory', val as typeof defaultEventCategory)
                    }
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Enable or disable event notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={notifications}
                      onCheckedChange={(val) =>
                        setSetting('notifications', val)
                      }
                    />
                    <Label>Enable notifications</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance */}
          <TabsContent value="appearance">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>
                    Toggle between light and dark mode.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ThemeToggle />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Separator className="my-8" />

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </main>
    </div>
  )
}