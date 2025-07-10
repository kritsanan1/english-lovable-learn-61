export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          created_at: string
          id: string
          participants: number
          status: string
          total_price: number
          tour_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          booking_date: string
          created_at?: string
          id?: string
          participants: number
          status?: string
          total_price: number
          tour_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          booking_date?: string
          created_at?: string
          id?: string
          participants?: number
          status?: string
          total_price?: number
          tour_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          image_url: string | null
          instructor_id: string | null
          price: number
          stream_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          image_url?: string | null
          instructor_id?: string | null
          price?: number
          stream_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          image_url?: string | null
          instructor_id?: string | null
          price?: number
          stream_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          course_id: string | null
          file_name: string | null
          file_url: string
          id: string
          type: Database["public"]["Enums"]["document_type"]
          uploaded_at: string | null
        }
        Insert: {
          course_id?: string | null
          file_name?: string | null
          file_url: string
          id?: string
          type: Database["public"]["Enums"]["document_type"]
          uploaded_at?: string | null
        }
        Update: {
          course_id?: string | null
          file_name?: string | null
          file_url?: string
          id?: string
          type?: Database["public"]["Enums"]["document_type"]
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      enrollments: {
        Row: {
          course_id: string | null
          enrolled_at: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      freelancers: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          currency: string
          description: string
          hourly_rate: number
          id: number
          name: string
          portfolio_links: string[] | null
          rating: number | null
          review_count: number | null
          skills: string[]
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          currency: string
          description: string
          hourly_rate: number
          id?: number
          name: string
          portfolio_links?: string[] | null
          rating?: number | null
          review_count?: number | null
          skills: string[]
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          currency?: string
          description?: string
          hourly_rate?: number
          id?: number
          name?: string
          portfolio_links?: string[] | null
          rating?: number | null
          review_count?: number | null
          skills?: string[]
          user_id?: string | null
        }
        Relationships: []
      }
      listings: {
        Row: {
          category: string
          created_at: string | null
          currency: string
          description: string
          features: Json | null
          id: number
          images: string[]
          location: string
          price: number
          status: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          currency: string
          description: string
          features?: Json | null
          id?: number
          images: string[]
          location: string
          price: number
          status?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          currency?: string
          description?: string
          features?: Json | null
          id?: number
          images?: string[]
          location?: string
          price?: number
          status?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          is_freelancer: boolean | null
          is_seller: boolean | null
          phone: string | null
          updated_at: string | null
          verification_level: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          is_freelancer?: boolean | null
          is_seller?: boolean | null
          phone?: string | null
          updated_at?: string | null
          verification_level?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          is_freelancer?: boolean | null
          is_seller?: boolean | null
          phone?: string | null
          updated_at?: string | null
          verification_level?: number | null
        }
        Relationships: []
      }
      progress: {
        Row: {
          completed: boolean | null
          course_id: string | null
          id: string
          last_accessed: string | null
          user_id: string | null
        }
        Insert: {
          completed?: boolean | null
          course_id?: string | null
          id?: string
          last_accessed?: string | null
          user_id?: string | null
        }
        Update: {
          completed?: boolean | null
          course_id?: string | null
          id?: string
          last_accessed?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          booking_details: Json | null
          created_at: string | null
          currency: string
          destination: string
          end_date: string
          id: number
          payment_method: string | null
          payment_status: string | null
          start_date: string
          status: string | null
          total_amount: number
          travelers: number
          type: string
          user_id: string
        }
        Insert: {
          booking_details?: Json | null
          created_at?: string | null
          currency: string
          destination: string
          end_date: string
          id?: number
          payment_method?: string | null
          payment_status?: string | null
          start_date: string
          status?: string | null
          total_amount: number
          travelers: number
          type: string
          user_id: string
        }
        Update: {
          booking_details?: Json | null
          created_at?: string | null
          currency?: string
          destination?: string
          end_date?: string
          id?: number
          payment_method?: string | null
          payment_status?: string | null
          start_date?: string
          status?: string | null
          total_amount?: number
          travelers?: number
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          rating: number
          tour_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          tour_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          tour_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          accepted_currencies: string[]
          address: string
          category: string
          created_at: string | null
          description: string
          id: number
          lat: number
          lng: number
          name: string
          opening_hours: string
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          accepted_currencies: string[]
          address: string
          category: string
          created_at?: string | null
          description: string
          id?: number
          lat: number
          lng: number
          name: string
          opening_hours: string
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          accepted_currencies?: string[]
          address?: string
          category?: string
          created_at?: string | null
          description?: string
          id?: number
          lat?: number
          lng?: number
          name?: string
          opening_hours?: string
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          stripe_customer_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          stripe_customer_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      tours: {
        Row: {
          created_at: string
          description: string
          duration_days: number
          id: string
          image_url: string | null
          location: string
          max_participants: number
          price: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          duration_days: number
          id?: string
          image_url?: string | null
          location: string
          max_participants: number
          price: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          duration_days?: number
          id?: string
          image_url?: string | null
          location?: string
          max_participants?: number
          price?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      usage_tracking: {
        Row: {
          created_at: string
          email: string
          id: string
          questions_used: number
          reset_date: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          questions_used?: number
          reset_date?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          questions_used?: number
          reset_date?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          id: string
          line_id: string | null
          name: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id: string
          line_id?: string | null
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string
          line_id?: string | null
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      verifications: {
        Row: {
          created_at: string | null
          document_type: string
          document_url: string
          id: number
          level: number | null
          rejection_reason: string | null
          selfie_url: string | null
          status: string | null
          user_id: string
          verified_at: string | null
        }
        Insert: {
          created_at?: string | null
          document_type: string
          document_url: string
          id?: number
          level?: number | null
          rejection_reason?: string | null
          selfie_url?: string | null
          status?: string | null
          user_id: string
          verified_at?: string | null
        }
        Update: {
          created_at?: string | null
          document_type?: string
          document_url?: string
          id?: number
          level?: number | null
          rejection_reason?: string | null
          selfie_url?: string | null
          status?: string | null
          user_id?: string
          verified_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      document_type: "pdf" | "doc" | "image"
      user_role: "instructor" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_type: ["pdf", "doc", "image"],
      user_role: ["instructor", "student"],
    },
  },
} as const
