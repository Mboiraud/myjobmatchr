export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      companies: {
        Row: {
          company_size: string | null
          created_at: string | null
          description: string | null
          enriched_at: string | null
          founded_year: number | null
          headquarters_location: string | null
          id: string
          industry: string | null
          is_enriched: boolean | null
          logo_url: string | null
          name: string
          name_variations: string[] | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          company_size?: string | null
          created_at?: string | null
          description?: string | null
          enriched_at?: string | null
          founded_year?: number | null
          headquarters_location?: string | null
          id?: string
          industry?: string | null
          is_enriched?: boolean | null
          logo_url?: string | null
          name: string
          name_variations?: string[] | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          company_size?: string | null
          created_at?: string | null
          description?: string | null
          enriched_at?: string | null
          founded_year?: number | null
          headquarters_location?: string | null
          id?: string
          industry?: string | null
          is_enriched?: boolean | null
          logo_url?: string | null
          name?: string
          name_variations?: string[] | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      job_board_searches: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          job_board: string
          last_scraped_at: string | null
          search_criteria_id: string
          search_params: Json | null
          search_url: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          job_board: string
          last_scraped_at?: string | null
          search_criteria_id: string
          search_params?: Json | null
          search_url?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          job_board?: string
          last_scraped_at?: string | null
          search_criteria_id?: string
          search_params?: Json | null
          search_url?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_board_searches_search_criteria_id_fkey"
            columns: ["search_criteria_id"]
            isOneToOne: false
            referencedRelation: "search_criteria"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_board_searches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_id: string
          company_name_raw: string | null
          contract_type: string | null
          created_at: string | null
          description: string | null
          description_short: string | null
          employment_status: string | null
          experience_level: string | null
          id: string
          is_active: boolean | null
          is_canonical: boolean | null
          is_company_normalized: boolean | null
          is_duplicate_checked: boolean | null
          is_enriched: boolean | null
          last_seen_at: string | null
          location: string | null
          parent_job_id: string | null
          posted_date: string | null
          requirements: string[] | null
          responsibilities: string[] | null
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          salary_period: string | null
          scraped_at: string | null
          source_board: string
          source_job_id: string | null
          source_url: string
          title: string
          updated_at: string | null
          work_model: string | null
        }
        Insert: {
          company_id: string
          company_name_raw?: string | null
          contract_type?: string | null
          created_at?: string | null
          description?: string | null
          description_short?: string | null
          employment_status?: string | null
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          is_canonical?: boolean | null
          is_company_normalized?: boolean | null
          is_duplicate_checked?: boolean | null
          is_enriched?: boolean | null
          last_seen_at?: string | null
          location?: string | null
          parent_job_id?: string | null
          posted_date?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_period?: string | null
          scraped_at?: string | null
          source_board: string
          source_job_id?: string | null
          source_url: string
          title: string
          updated_at?: string | null
          work_model?: string | null
        }
        Update: {
          company_id?: string
          company_name_raw?: string | null
          contract_type?: string | null
          created_at?: string | null
          description?: string | null
          description_short?: string | null
          employment_status?: string | null
          experience_level?: string | null
          id?: string
          is_active?: boolean | null
          is_canonical?: boolean | null
          is_company_normalized?: boolean | null
          is_duplicate_checked?: boolean | null
          is_enriched?: boolean | null
          last_seen_at?: string | null
          location?: string | null
          parent_job_id?: string | null
          posted_date?: string | null
          requirements?: string[] | null
          responsibilities?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          salary_period?: string | null
          scraped_at?: string | null
          source_board?: string
          source_job_id?: string | null
          source_url?: string
          title?: string
          updated_at?: string | null
          work_model?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_parent_job_id_fkey"
            columns: ["parent_job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      search_criteria: {
        Row: {
          contract_types: string[] | null
          created_at: string | null
          id: string
          ideal_role_description: string | null
          important_keywords: string[] | null
          industries: string[] | null
          is_active: boolean | null
          matching_instructions: string
          must_have_requirements: string | null
          must_not_have_requirements: string | null
          preferred_locations: string[] | null
          salary_currency: string | null
          salary_max: number | null
          salary_min: number | null
          seniority_levels: string[] | null
          target_job_titles: string[] | null
          updated_at: string | null
          user_id: string
          willing_to_relocate: boolean | null
          work_environment_preferences: string | null
          work_models: string[] | null
          years_of_experience: number | null
        }
        Insert: {
          contract_types?: string[] | null
          created_at?: string | null
          id?: string
          ideal_role_description?: string | null
          important_keywords?: string[] | null
          industries?: string[] | null
          is_active?: boolean | null
          matching_instructions: string
          must_have_requirements?: string | null
          must_not_have_requirements?: string | null
          preferred_locations?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          seniority_levels?: string[] | null
          target_job_titles?: string[] | null
          updated_at?: string | null
          user_id: string
          willing_to_relocate?: boolean | null
          work_environment_preferences?: string | null
          work_models?: string[] | null
          years_of_experience?: number | null
        }
        Update: {
          contract_types?: string[] | null
          created_at?: string | null
          id?: string
          ideal_role_description?: string | null
          important_keywords?: string[] | null
          industries?: string[] | null
          is_active?: boolean | null
          matching_instructions?: string
          must_have_requirements?: string | null
          must_not_have_requirements?: string | null
          preferred_locations?: string[] | null
          salary_currency?: string | null
          salary_max?: number | null
          salary_min?: number | null
          seniority_levels?: string[] | null
          target_job_titles?: string[] | null
          updated_at?: string | null
          user_id?: string
          willing_to_relocate?: boolean | null
          work_environment_preferences?: string | null
          work_models?: string[] | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "search_criteria_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_experiences: {
        Row: {
          company_name: string
          created_at: string | null
          description: string | null
          employment_type: string | null
          end_date: string | null
          id: string
          is_current: boolean | null
          job_title: string
          location: string | null
          start_date: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_name: string
          created_at?: string | null
          description?: string | null
          employment_type?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          job_title: string
          location?: string | null
          start_date: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          description?: string | null
          employment_type?: string | null
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          job_title?: string
          location?: string | null
          start_date?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_experiences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          cv_file_url: string | null
          cv_parsed_text: string | null
          first_name: string | null
          id: string
          last_manual_search_at: string | null
          last_name: string | null
          phone_number: string | null
          profile_completeness: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          cv_file_url?: string | null
          cv_parsed_text?: string | null
          first_name?: string | null
          id: string
          last_manual_search_at?: string | null
          last_name?: string | null
          phone_number?: string | null
          profile_completeness?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          cv_file_url?: string | null
          cv_parsed_text?: string | null
          first_name?: string | null
          id?: string
          last_manual_search_at?: string | null
          last_name?: string | null
          phone_number?: string | null
          profile_completeness?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_skills: {
        Row: {
          created_at: string | null
          id: string
          skill_name: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          skill_name: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          skill_name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
