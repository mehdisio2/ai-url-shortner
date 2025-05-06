"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"
import urlData from "@/app/dashboard/links/urls.json"

// Mock data - replace with your actual data

export function UrlTable() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)

  const copyToClipboard = (shortUrl: string) => {
    const fullUrl = `${window.location.origin}/${shortUrl}`
    navigator.clipboard.writeText(fullUrl)
    setCopiedUrl(shortUrl)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

/*  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }
*/

  const truncateUrl = (url: string, maxLength = 40) => {
    return url.length > maxLength ? `${url.substring(0, maxLength)}...` : url
  }

  return (
    <div className="rounded-md border ">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Original URL</TableHead>
            <TableHead>Shortened URL</TableHead>
            <TableHead>Clicks</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {urlData.map((url) => (
            <TableRow key={url.shortUrl}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <span className="truncate max-w-[250px]" title={url.originalUrl}>
                    {truncateUrl(url.originalUrl)}
                  </span>
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <a href={`/${url.shortUrl}`} className="text-blue-600 hover:underline">
                    {window.location.origin}/{url.shortUrl}
                  </a>
                  <Button variant="ghost" size="icon" onClick={() => copyToClipboard(url.shortUrl)} className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                  </Button>
                  {copiedUrl === url.shortUrl && <span className="text-xs text-green-600">Copied!</span>}
                </div>
              </TableCell>
              <TableCell>{url.clicks}</TableCell>
              <TableCell>{url.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
