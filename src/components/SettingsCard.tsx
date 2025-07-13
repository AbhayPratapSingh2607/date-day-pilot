import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'

export interface SettingsCardProps {
  title: string
  description: string
  children: React.ReactNode
  icon?: React.ReactNode
}

export function SettingsCard({ title, description, children, icon }: SettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          {icon && (
            <div className="flex-shrink-0 text-muted-foreground">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription className="mt-1 text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  )
}