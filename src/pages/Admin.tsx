import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Bell, Calendar, BookOpen, Clock, Settings, 
  Plus, Trash2, Save, X, Loader2, Home, Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert } from '@/integrations/supabase/types';

type Announcement = Tables<'announcements'>;
type Event = Tables<'events'>;
type Resource = Tables<'educational_resources'>;
type PrayerTime = Tables<'prayer_times'>;

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchAllData();
    }
  }, [user]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [announcementsRes, eventsRes, resourcesRes, prayerRes] = await Promise.all([
        supabase.from('announcements').select('*').order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('event_date', { ascending: true }),
        supabase.from('educational_resources').select('*').order('created_at', { ascending: false }),
        supabase.from('prayer_times').select('*').order('prayer_name')
      ]);

      if (announcementsRes.data) setAnnouncements(announcementsRes.data);
      if (eventsRes.data) setEvents(eventsRes.data);
      if (resourcesRes.data) setResources(resourcesRes.data);
      if (prayerRes.data) setPrayerTimes(prayerRes.data);
    } catch (err) {
      toast({ title: "Error", description: "Failed to load data", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // CRUD Operations with proper typing
  const createAnnouncement = async (data: TablesInsert<'announcements'>) => {
    const { error } = await supabase.from('announcements').insert([data]);
    if (error) throw error;
  };

  const createEvent = async (data: TablesInsert<'events'>) => {
    const { error } = await supabase.from('events').insert([data]);
    if (error) throw error;
  };

  const createResource = async (data: TablesInsert<'educational_resources'>) => {
    const { error } = await supabase.from('educational_resources').insert([data]);
    if (error) throw error;
  };

  const createPrayerTime = async (data: TablesInsert<'prayer_times'>) => {
    const { error } = await supabase.from('prayer_times').insert([data]);
    if (error) throw error;
  };

  const handleCreate = async (type: 'announcement' | 'event' | 'resource' | 'prayer') => {
    try {
      switch (type) {
        case 'announcement':
          await createAnnouncement(formData as TablesInsert<'announcements'>);
          break;
        case 'event':
          await createEvent(formData as TablesInsert<'events'>);
          break;
        case 'resource':
          await createResource(formData as TablesInsert<'educational_resources'>);
          break;
        case 'prayer':
          await createPrayerTime(formData as TablesInsert<'prayer_times'>);
          break;
      }
      toast({ title: "Success", description: "Item created successfully" });
      fetchAllData();
      setEditingItem(null);
      setFormData({});
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const deleteAnnouncement = async (id: string) => {
    const { error } = await supabase.from('announcements').delete().eq('id', id);
    if (error) throw error;
  };

  const deleteEvent = async (id: string) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
  };

  const deleteResource = async (id: string) => {
    const { error } = await supabase.from('educational_resources').delete().eq('id', id);
    if (error) throw error;
  };

  const deletePrayerTime = async (id: string) => {
    const { error } = await supabase.from('prayer_times').delete().eq('id', id);
    if (error) throw error;
  };

  const handleDelete = async (type: 'announcement' | 'event' | 'resource' | 'prayer', id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      switch (type) {
        case 'announcement':
          await deleteAnnouncement(id);
          break;
        case 'event':
          await deleteEvent(id);
          break;
        case 'resource':
          await deleteResource(id);
          break;
        case 'prayer':
          await deletePrayerTime(id);
          break;
      }
      toast({ title: "Success", description: "Item deleted successfully" });
      fetchAllData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const toggleAnnouncementActive = async (id: string, currentState: boolean) => {
    const { error } = await supabase.from('announcements').update({ is_active: !currentState }).eq('id', id);
    if (error) throw error;
  };

  const toggleEventActive = async (id: string, currentState: boolean) => {
    const { error } = await supabase.from('events').update({ is_active: !currentState }).eq('id', id);
    if (error) throw error;
  };

  const toggleResourceActive = async (id: string, currentState: boolean) => {
    const { error } = await supabase.from('educational_resources').update({ is_active: !currentState }).eq('id', id);
    if (error) throw error;
  };

  const togglePrayerActive = async (id: string, currentState: boolean) => {
    const { error } = await supabase.from('prayer_times').update({ is_active: !currentState }).eq('id', id);
    if (error) throw error;
  };

  const toggleActive = async (type: 'announcement' | 'event' | 'resource' | 'prayer', id: string, currentState: boolean) => {
    try {
      switch (type) {
        case 'announcement':
          await toggleAnnouncementActive(id, currentState);
          break;
        case 'event':
          await toggleEventActive(id, currentState);
          break;
        case 'resource':
          await toggleResourceActive(id, currentState);
          break;
        case 'prayer':
          await togglePrayerActive(id, currentState);
          break;
      }
      fetchAllData();
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin && user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="max-w-md">
          <CardHeader className="text-center">
            <Shield className="w-16 h-16 mx-auto text-destructive mb-4" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have admin privileges. Contact the administrator to get access.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2 justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" /> Go Home
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-islamic flex items-center justify-center">
              <Settings className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" /> View Site
            </Button>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="announcements" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger value="announcements" className="gap-2">
              <Bell className="w-4 h-4" /> Announcements
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Calendar className="w-4 h-4" /> Events
            </TabsTrigger>
            <TabsTrigger value="resources" className="gap-2">
              <BookOpen className="w-4 h-4" /> Resources
            </TabsTrigger>
            <TabsTrigger value="prayer" className="gap-2">
              <Clock className="w-4 h-4" /> Prayer Times
            </TabsTrigger>
          </TabsList>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Announcements</h2>
              <Button onClick={() => { setEditingItem('new-announcement'); setFormData({ type: 'info', is_active: true }); }}>
                <Plus className="w-4 h-4 mr-2" /> Add New
              </Button>
            </div>

            {editingItem === 'new-announcement' && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>New Announcement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title (English)</Label>
                      <Input value={formData.title_en || ''} onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} />
                    </div>
                    <div>
                      <Label>Title (Urdu)</Label>
                      <Input value={formData.title_ur || ''} onChange={(e) => setFormData({ ...formData, title_ur: e.target.value })} className="text-right" dir="rtl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Content (English)</Label>
                      <Textarea value={formData.content_en || ''} onChange={(e) => setFormData({ ...formData, content_en: e.target.value })} />
                    </div>
                    <div>
                      <Label>Content (Urdu)</Label>
                      <Textarea value={formData.content_ur || ''} onChange={(e) => setFormData({ ...formData, content_ur: e.target.value })} className="text-right" dir="rtl" />
                    </div>
                  </div>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <Label>Type</Label>
                      <Select value={formData.type || 'info'} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="event">Event</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => handleCreate('announcement')}>
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button variant="outline" onClick={() => { setEditingItem(null); setFormData({}); }}>
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {announcements.map((item) => (
                <Card key={item.id} className={!item.is_active ? 'opacity-60' : ''}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={item.type === 'urgent' ? 'destructive' : item.type === 'event' ? 'default' : 'secondary'}>
                          {item.type}
                        </Badge>
                        {!item.is_active && <Badge variant="outline">Inactive</Badge>}
                      </div>
                      <h3 className="font-semibold">{item.title_en}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{item.content_en}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={item.is_active ?? false} onCheckedChange={() => toggleActive('announcement', item.id, item.is_active ?? false)} />
                      <Button size="sm" variant="ghost" onClick={() => handleDelete('announcement', item.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {announcements.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No announcements yet. Create your first one!
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Events</h2>
              <Button onClick={() => { setEditingItem('new-event'); setFormData({ category: 'general', is_active: true }); }}>
                <Plus className="w-4 h-4 mr-2" /> Add New
              </Button>
            </div>

            {editingItem === 'new-event' && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>New Event</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title (English)</Label>
                      <Input value={formData.title_en || ''} onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} />
                    </div>
                    <div>
                      <Label>Title (Urdu)</Label>
                      <Input value={formData.title_ur || ''} onChange={(e) => setFormData({ ...formData, title_ur: e.target.value })} className="text-right" dir="rtl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Description (English)</Label>
                      <Textarea value={formData.description_en || ''} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} />
                    </div>
                    <div>
                      <Label>Description (Urdu)</Label>
                      <Textarea value={formData.description_ur || ''} onChange={(e) => setFormData({ ...formData, description_ur: e.target.value })} className="text-right" dir="rtl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <Label>Date</Label>
                      <Input type="date" value={formData.event_date || ''} onChange={(e) => setFormData({ ...formData, event_date: e.target.value })} />
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input value={formData.event_time || ''} onChange={(e) => setFormData({ ...formData, event_time: e.target.value })} placeholder="e.g., 7:00 PM" />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input value={formData.location || ''} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={formData.category || 'general'} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="youth">Youth</SelectItem>
                          <SelectItem value="prayer">Prayer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleCreate('event')}>
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button variant="outline" onClick={() => { setEditingItem(null); setFormData({}); }}>
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {events.map((item) => (
                <Card key={item.id} className={!item.is_active ? 'opacity-60' : ''}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge>{item.category}</Badge>
                        <span className="text-sm text-muted-foreground">{item.event_date} {item.event_time && `at ${item.event_time}`}</span>
                        {!item.is_active && <Badge variant="outline">Inactive</Badge>}
                      </div>
                      <h3 className="font-semibold">{item.title_en}</h3>
                      {item.description_en && <p className="text-sm text-muted-foreground line-clamp-1">{item.description_en}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={item.is_active ?? false} onCheckedChange={() => toggleActive('event', item.id, item.is_active ?? false)} />
                      <Button size="sm" variant="ghost" onClick={() => handleDelete('event', item.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {events.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No events yet. Create your first one!
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Educational Resources</h2>
              <Button onClick={() => { setEditingItem('new-resource'); setFormData({ category: 'general', is_active: true }); }}>
                <Plus className="w-4 h-4 mr-2" /> Add New
              </Button>
            </div>

            {editingItem === 'new-resource' && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>New Resource</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Title (English)</Label>
                      <Input value={formData.title_en || ''} onChange={(e) => setFormData({ ...formData, title_en: e.target.value })} />
                    </div>
                    <div>
                      <Label>Title (Urdu)</Label>
                      <Input value={formData.title_ur || ''} onChange={(e) => setFormData({ ...formData, title_ur: e.target.value })} className="text-right" dir="rtl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Description (English)</Label>
                      <Textarea value={formData.description_en || ''} onChange={(e) => setFormData({ ...formData, description_en: e.target.value })} />
                    </div>
                    <div>
                      <Label>Description (Urdu)</Label>
                      <Textarea value={formData.description_ur || ''} onChange={(e) => setFormData({ ...formData, description_ur: e.target.value })} className="text-right" dir="rtl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Select value={formData.category || 'general'} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General</SelectItem>
                          <SelectItem value="quran">Quran</SelectItem>
                          <SelectItem value="hadith">Hadith</SelectItem>
                          <SelectItem value="fiqh">Fiqh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Resource URL (optional)</Label>
                      <Input value={formData.resource_url || ''} onChange={(e) => setFormData({ ...formData, resource_url: e.target.value })} placeholder="https://..." />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleCreate('resource')}>
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button variant="outline" onClick={() => { setEditingItem(null); setFormData({}); }}>
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {resources.map((item) => (
                <Card key={item.id} className={!item.is_active ? 'opacity-60' : ''}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge>{item.category}</Badge>
                        {!item.is_active && <Badge variant="outline">Inactive</Badge>}
                      </div>
                      <h3 className="font-semibold">{item.title_en}</h3>
                      {item.description_en && <p className="text-sm text-muted-foreground line-clamp-1">{item.description_en}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={item.is_active ?? false} onCheckedChange={() => toggleActive('resource', item.id, item.is_active ?? false)} />
                      <Button size="sm" variant="ghost" onClick={() => handleDelete('resource', item.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {resources.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground">
                  No resources yet. Create your first one!
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Prayer Times Tab */}
          <TabsContent value="prayer" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Prayer Times</h2>
              <Button onClick={() => { setEditingItem('new-prayer'); setFormData({ is_active: true }); }}>
                <Plus className="w-4 h-4 mr-2" /> Add New
              </Button>
            </div>

            {editingItem === 'new-prayer' && (
              <Card className="border-primary">
                <CardHeader>
                  <CardTitle>New Prayer Time</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Prayer Name</Label>
                      <Input value={formData.prayer_name || ''} onChange={(e) => setFormData({ ...formData, prayer_name: e.target.value })} placeholder="e.g., Fajr" />
                    </div>
                    <div>
                      <Label>Iqamah Time</Label>
                      <Input value={formData.iqamah_time || ''} onChange={(e) => setFormData({ ...formData, iqamah_time: e.target.value })} placeholder="e.g., 6:30 AM" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleCreate('prayer')}>
                      <Save className="w-4 h-4 mr-2" /> Save
                    </Button>
                    <Button variant="outline" onClick={() => { setEditingItem(null); setFormData({}); }}>
                      <X className="w-4 h-4 mr-2" /> Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {prayerTimes.map((item) => (
                <Card key={item.id} className={!item.is_active ? 'opacity-60' : ''}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{item.prayer_name}</h3>
                      <p className="text-2xl font-bold text-primary">{item.iqamah_time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={item.is_active ?? false} onCheckedChange={() => toggleActive('prayer', item.id, item.is_active ?? false)} />
                      <Button size="sm" variant="ghost" onClick={() => handleDelete('prayer', item.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {prayerTimes.length === 0 && (
                <Card className="p-8 text-center text-muted-foreground col-span-full">
                  No prayer times set. Add your first one!
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
