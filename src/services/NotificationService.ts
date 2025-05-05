
import { Person, PersonStatus } from "@/types";
import { toast } from "@/hooks/use-toast";

interface MatchNotification {
  id: string;
  missingPerson: Person;
  foundPerson: Person;
  matchScore: number;
  timestamp: Date;
  isRead: boolean;
}

// In a real application, this would be stored in a database
let notifications: MatchNotification[] = [];

// In a real application, these would be actual user IDs from the database
const MOCK_REPORTERS = {
  "1": { id: "reporter1", name: "John's Family", email: "family@example.com" },
  "2": { id: "reporter2", name: "Jane's Friend", email: "friend@example.com" },
  "4": { id: "reporter3", name: "Boston Police", email: "boston.pd@example.com" },
  "5": { id: "reporter4", name: "Seattle Shelter", email: "shelter@example.com" },
  "6": { id: "reporter5", name: "Chicago PD", email: "chicago.pd@example.com" },
  "7": { id: "reporter6", name: "Denver Hospital", email: "denver.hospital@example.com" },
};

export const NotificationService = {
  /**
   * Create and store a notification for a match between two persons
   */
  createMatchNotification: (missingPerson: Person, foundPerson: Person, matchScore: number): MatchNotification => {
    const notification: MatchNotification = {
      id: `match-${Date.now()}`,
      missingPerson,
      foundPerson,
      matchScore,
      timestamp: new Date(),
      isRead: false
    };
    
    notifications.push(notification);
    console.log("Match notification created:", notification);
    
    // In a real app, we would send emails/push notifications here
    // to the reporters of both the missing and found persons
    console.log(`Notifying reporter of missing person: ${MOCK_REPORTERS[missingPerson.id]?.name || "Unknown"}`);
    console.log(`Notifying reporter of found person: ${MOCK_REPORTERS[foundPerson.id]?.name || "Unknown"}`);
    
    return notification;
  },
  
  /**
   * Get all stored notifications
   */
  getNotifications: (): MatchNotification[] => {
    return [...notifications];
  },
  
  /**
   * Mark a notification as read
   */
  markAsRead: (notificationId: string): void => {
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
  },
  
  /**
   * Clear all notifications
   */
  clearAllNotifications: (): void => {
    notifications = [];
  },
  
  /**
   * Show a toast notification for a match
   */
  showMatchToast: (missingPerson: Person, foundPerson: Person, matchScore: number): void => {
    toast({
      title: "Potential Match Found!",
      description: `${missingPerson.name} (Missing) may match with ${foundPerson.name} (Found) - ${Math.round(matchScore * 100)}% similarity`,
      variant: "default",
    });
    
    // Display who will be notified
    setTimeout(() => {
      toast({
        title: "Notifications Sent",
        description: `Reporters for both ${missingPerson.name} and ${foundPerson.name} have been notified of this potential match.`,
        variant: "default",
      });
    }, 2000);
  },
  
  /**
   * Show a toast notification for no matches
   */
  showNoMatchToast: (person: Person): void => {
    toast({
      title: "No Matches Found",
      description: `No potential matches found for ${person.name}.`,
      variant: "destructive",
    });
  }
};
